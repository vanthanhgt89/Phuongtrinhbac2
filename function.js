#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  // you specify arguments using .argument()
  // 'app' is required, 'env' is optional
  .command('deploy', 'Deploy an application')
  .argument('<a>', 'tham so a')
  .action(function (args, options, logger) {
    class Check{
      contructor(){

      }

      // getFunction(num){
      //   if(num >= 0){
      //     return () => console.log('so duong')
      //   }else {
      //     return () => console.log('so am')
      //   }
      // }

       getFunction(num){
        if (num >= 0) return () => console.log('so duong')
        return () => console.log('so am')
      }

    }
    // let a = () =>{} tra ve undefined
    let iCheck = new Check()
    iCheck.getFunction(args.a)()
   
  });

prog.parse(process.argv);

// ./myprog deploy myapp production --tail 100

