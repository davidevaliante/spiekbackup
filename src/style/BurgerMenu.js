/* A quanto pare il burger di merda menù ha tutti gli stili inline quindi il css praticamente
* non serve ad un cazzo! se non mettendo !important ovunque */
export const burgerMenuStyle = {
    bmBurgerButton: {
        position: 'fixed',
        width: '30px',
        height: '24px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#eb2613'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        //background: '#373a47',
        background: '#fff',
        paddingTop: '3rem',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
    },
    bmItem: {

    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    },
    bmMenuWrap: {
        width: '100%'
    }
}