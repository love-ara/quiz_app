export const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        background: "#a76ae4"
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '80%',
        borderRadius: '8px',
    },
    formContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    header: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    title: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '12px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        maxWidth: '200px',
        padding: '15px 20px',
        borderRadius: '10px',
        fontSize: '15px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
    },
    button: {
        backgroundColor: '#55229e',
        color: '#ffffff',
        padding: '10px 20px',
        fontSize: '16px',
        width: '100%',
        maxWidth: '300px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionsList: {
        listStyleType: 'none',
        padding: 0,

    },
    questionItem: {
        marginBottom: '20px',

    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    paginationButton: {
        backgroundColor: '#55229e',
        color: '#ffffff',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    totalScoreContainer: {
        textAlign: 'center',
         marginTop: '20px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '20px',
        marginLeft: '90px',
    },
    link: {
        color: '#55229e',
        marginLeft: '5px',
    },
    '@media and screen(min-width: 796px) ': {
        container: {
            flexDirection: 'row',
        },
        imageContainer: {
            flex: 1,
            marginBottom: 0,
        },
        formContainer: {
            flex: 1,
            maxWidth: 'none',
            margin: 0,
        },
    },

};