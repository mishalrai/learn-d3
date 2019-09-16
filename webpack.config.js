const path = require("path");

module.exports ={
    entry:{
        main:'./assets/src/js/main.js'    
    },
    devtool: 'source-maps',
    mode:"development",
    output:{
        filename:"[name].js",
        path: path.resolve(__dirname, "assets/build/js"),
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    watch: true
}