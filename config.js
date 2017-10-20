module.exports = {
    session: {
            secret: 'youcantfigureitout'
    },

    db: {
        dbUSer: 'JamesScott',
        database: 'JamesScott',
        conncetionString: 'postgres://oviibsnlkkbnwf:d2b774c98eccee91b1cef8d43a3e76d93f01b0b7352283af4759dc31c97aed85@ec2-54-235-250-15.compute-1.amazonaws.com:5432/dcc9j5kmcs4ico?ssl=true' 
        
    },

    auth0: {
        domain: 'jamescott.auth0.com',
        clientID: 'ElSPdx2CL1sfcAVc0gTe5zeRrChaIGau',
        clientSecret: 'APE0r1t5zgp4d6ejoHZ0u-oR-qZinRhuweyASmjYg3pHXCHLz9Cipj_IQOiOGUor'
    },
    keys: {
        stripePublicKey: 'pk_test_AcVYHno8m2zXni1DEdMDF2hL',
        stripeSecretKey: 'sk_test_cW2ePkIYoNH0QHyItv6PcYI9'

    }
}
