//Forcer le redirect quand l'utilisateur entre le lien non securise

const redirectToHttps = (req, res, next) => {
    if (!req.secure) {
        console.log('Url',req.headers.host)
        return res.redirect('https://' + req.headers.host + req.originalUrl)
    }
    next()
}

export default redirectToHttps