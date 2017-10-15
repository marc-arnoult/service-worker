axios.get('/api/count')
    .then(function (res) {
        return res.data;
    })
    .then(function (data) {
        return data.nbArticles;
    })
    .then(function (nbArticles) {
        console.log(nbArticles)
    })
    .catch(function (err) {
        console.log('une erreur')
    });
