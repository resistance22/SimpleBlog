import chalk from 'chalk'
export default function (req,res,next) {
    const D = new Date()
    console.log( `${ chalk.blue(req.method) } request for path:${ chalk.green(req.path) } \nDate:${chalk.blue(D.toLocaleDateString())},Time:${ chalk.blue(D.toLocaleTimeString()) } ` )
    next()
}