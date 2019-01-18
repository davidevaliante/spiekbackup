import * as functions from 'firebase-functions';
const { Storage } = require('@google-cloud/storage');
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import * as sharp from 'sharp';
import * as fileSystem from 'fs-extra';
import { truncate, now } from 'lodash';

// costanti necessarie
const admin = require('firebase-admin');
const mkdirp = require('mkdirp-promise');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const rp = require('request-promise');
const crypto = require('crypto');
const secureCompare = require('secure-compare');

admin.initializeApp();

const gcs = new Storage();
const slotSizes = [64, 250];
const producerSizes = [64];


const removeHtmlFrom = (s) => {
    let str = s
    if ((str === null) || (str === ''))
        return false;

    return str.replace(/<[^>]*>/g, '');
}

// -------------------DATABASE TRIGGERS--------------------------------------------------------------
export const onBonusUpdated = functions.database.ref('Bonus/{language}/{id}').onUpdate(
    (ciao, context) => {
        const updatedBonus = ciao.after.exportVal()

        admin.database().ref(`/Slots/${context.params.language}`).once("value", snapshot => {
            const x = snapshot.val()
            for (const key in x) {
                const changedId = context.params.id
                const element = x[key]
                if (element.bonus[changedId] !== undefined) {
                    element.bonus[changedId] = updatedBonus
                    admin.database().ref(`/Slots/${context.params.language}/${key}`).set(element)
                }
            }
        })

        return null
    }
)

export const onSlotAdded = functions.database.ref('/Slots/{language}/{pushId}/')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const newSlot = snapshot.val();
        const slotCard = {
            name: newSlot.name,
            producer: newSlot.producer.name,
            rating: newSlot.rating,
            time: newSlot.time,
            type: newSlot.type,
            description: truncate(removeHtmlFrom(newSlot.description), { 'length': 150 })
        }

        const slotMenu = {
            name: newSlot.name,
            description: `${truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`,
            type: newSlot.type
        }

        return admin.database().ref(`/SlotsCard/${context.params.language}/${context.params.pushId}`).set(slotCard)
            .then(() =>
                admin.database().ref(`/SlotsMenu/${context.params.language}/${context.params.pushId}`).set(slotMenu)
            )
    });

export const onSlotUpdated = functions.database.ref('/Slots/{language}/{editedId}/')
    .onUpdate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const newSlot = snapshot.after.val();
        const baseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/SlotImages%2F';
        const baseName = newSlot.imageName
        const slotCard = {
            name: newSlot.name,
            image: `${baseImageUrl}thumb_${slotSizes[1]}_${baseName}?alt=media`,
            producer: newSlot.producer.name,
            rating: newSlot.rating,
            time: newSlot.time,
            type: newSlot.type,
            description: truncate(removeHtmlFrom(newSlot.description), { 'length': 150 }),
            isPopular: newSlot.isPopular
        }

        const slotMenu = {
            name: newSlot.name,
            image: `${baseImageUrl}thumb_${slotSizes[0]}_${baseName}?alt=media`,
            description: `${truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`,
            type: newSlot.type
        }

        return admin.database().ref(`/SlotsCard/${context.params.language}/${context.params.editedId}`).set(slotCard).then(() =>
            admin.database().ref(`/SlotsMenu/${context.params.language}/${context.params.editedId}`).set(slotMenu)
        )
    });


export const onSlotDeleted = functions.database.ref('/Slots/{language}/{slotId}/')
    .onDelete((snapshot, context) => {
        const slotId = context.params.slotId;
        const language = context.params.language
        const imageName = snapshot.val().image.split('?alt')[0].split('/SlotImages%2F').pop()
        console.log('image name', imageName);

        return admin.database().ref.child(`/SlotsCard/${language}/${slotId}`).remove()
            .then(() => {
                console.log('should remove path:');

                admin.storage().ref(`/SlotImages/${imageName}`).remove()
            })

    })

// -----------------------STORAGE TRIGGERS------------------------------------------------------------
export const generateThumbs = functions.storage.object().onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket)
    // dove si trova il file nello storage
    const filePath = object.name;
    // fa split rispetto a '/' e prende l'ultimo elemento dell'array
    const fileName = filePath.split('/').pop();
    // nome della cartella originale del file
    const bucketDir = dirname(filePath);


    // metadata file
    const metadata = {
        contentType: 'image/jpeg',
    }

    // break point per evitare che la funzione trigegri all'infinito
    // di base questa funzione va ogni volta che viene aggiunta un immagine
    // quindi riscrivendo nello storage l'immagine ridimensionata il loop sarebbe infito
    if (fileName.includes('thumb_') ||
        fileName.includes('bonus') ||
        !object.contentType.includes('image')) {
        return false;
    }

    // se l'immagine che triggera è di una slot servono 2 thumbnail
    if (fileName.includes('slot')) {

        // array di promises
        const slotUploadPromises = slotSizes.map(async size => {
            const thumbName = `thumb_${size}_${fileName}`;
            // nome con tempo aggiunto
            const thumbPath = join(path.dirname(filePath), thumbName);
            const thumbnailUploadStream = bucket.file(thumbPath).createWriteStream({ metadata });

            const pipeline = sharp();

            pipeline.resize(size, Math.floor((size * 9) / 16)).max()
                .pipe(thumbnailUploadStream);

            bucket.file(filePath).createReadStream().pipe(pipeline);

            return new Promise((resolve, reject) => thumbnailUploadStream.on('finish', resolve).on('error', reject));
        });
        // chiamiamo tutte le promises nell'array
        await Promise.all(slotUploadPromises)
    }


    // se l'immagine che triggera è di un bonus serve solo 1 thumbnail piccolo per il menu
    if (fileName.includes('producer')) {
        const producerUploadPromises = producerSizes.map(async size => {
            const thumbName = `thumb_${size}_${fileName}`;
            const thumbPath = join(path.dirname(filePath), thumbName);
            'GoogleCloud13467/ciao/qualcosa/sanitalia' + 'nome_della_foto'
            const thumbnailUploadStream = bucket.file(thumbPath).createWriteStream({ metadata });

            const pipeline = sharp();

            pipeline.resize(size, Math.floor((size * 9) / 16)).max()
                .pipe(thumbnailUploadStream);

            bucket.file(filePath).createReadStream().pipe(pipeline);

            return new Promise((resolve, reject) => thumbnailUploadStream.on('finish', resolve).on('error', reject));
        });

        // chiamiamo tutte le promises nell'array
        await Promise.all(producerUploadPromises);
    }

    return true
})



export const imageToJPG = functions.storage.object().onFinalize(async (object) => {
    'OPERATORS_IMAGES/BLV6LGrgFQR92F4K5mA23YkruRO2.jpeg'
    const filePath = object.name;

    const baseFileName = path.basename(filePath, path.extname(filePath));
    // baseFileName = BLV6LGrgFQR92F4K5mA23YkruRO2
    const fileDir = path.dirname(filePath);
    // fileDir = OPERATORS_IMAGES/

    const JPEGFilePath = path.normalize(path.format({ dir: fileDir, name: baseFileName }));
    'OPERATORS_IMAGES/BLV6LGrgFQR92F4K5mA23YkruRO2'


    // os.tempdir() = C://cartella_temporanea_che_non_conosco
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    // cartella_temporanea_che_non_conosco/OPERATORS_IMAGES/BLV6LGrgFQR92F4K5mA23YkruRO2.jpeg
    const tempLocalDir = path.dirname(tempLocalFile);
    // tempLocalDir = cartella_temporanea_che_non_conosco/OPERATORS_IMAGES
    const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);
    // tempLocalJPEGFile = cartella_temporanea_che_non_conosco/OPERATORS_IMAGES/BLV6LGrgFQR92F4K5mA23YkruRO2

    // Non deve andare se non è un immagine
    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

    // Non deve andare se è già jpeg
    if (object.contentType.startsWith('image/jpeg')) {
        console.log('Already a JPEG.');
        return null;
    }

    const bucket = admin.storage().bucket(object.bucket);
    // directory temporanea
    await mkdirp(tempLocalDir);
    // Download
    await bucket.file(filePath).download({ destination: tempLocalFile });
    console.log('The file has been downloaded to', tempLocalFile);
    // conversione in jpeg
    await spawn('convert', [tempLocalFile, tempLocalJPEGFile]);
    console.log('JPEG image created at', tempLocalJPEGFile);
    // upload
    await bucket.upload(tempLocalJPEGFile, { destination: JPEGFilePath });
    console.log('JPEG image uploaded to Storage at', JPEGFilePath);
    // rimozione file temporanei
    fs.unlinkSync(tempLocalJPEGFile);
    fs.unlinkSync(tempLocalFile);
    // rimozione file NON Jpeg
    bucket.file(filePath).delete();
    // rimozione cartella temporanea
    return fileSystem.remove(tempLocalDir);
});

/**
 * Webhook that will be called each time there is a new GitHub commit and will post a message to
 * Slack.
 */

// http generato durante il deploy per chiamare la funzione in remoto
// non disponibile con il piano free :/

/* exports.githubWebhook = functions.https.onRequest(async (req, res) => {
    const cipher = 'sha1';
    const signature = req.headers['x-hub-signature'];
    console.log('req', req)
    console.log('body', req.body);
    if (req.body) {
        // TODO: Configure the `github.secret` Google Cloud environment variables.
        const hmac = crypto.createHmac(cipher, functions.config().github.secret)
            .update(req.body)
            .digest('hex');
        const expectedSignature = `${cipher}=${hmac}`;
        console.log('expected', expectedSignature);
        console.log('hmac', hmac);

        // Check that the body of the request has been signed with the GitHub Secret.
        if (!secureCompare(signature, expectedSignature)) {
            console.error('x-hub-signature', signature, 'did not match', expectedSignature);
            return res.status(403).send('Your x-hub-signature\'s bad and you should feel bad!');
        }

        try {
            await postToSlack(req.body.compare, req.body.commits.length, req.body.repository);
            return null;
        } catch (error) {
            console.error(error);
            return res.status(500).send('Something went wrong while posting the message to Slack.');
        }
    } else {
        console.log('req', req)

        return null
    }
});


function postToSlack(url, commits, repo) {
    return rp({
        method: 'POST',
        // TODO: Configure the `slack.webhook_url` Google Cloud environment variables.
        uri: functions.config().slack.webhook_url,
        body: {
            text: `<${url}|${commits} new commit${commits > 1 ? 's' : ''}> pushed to <${repo.url}|${repo.full_name}>.`,
        },
        json: true,
    });
}
 */