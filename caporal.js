#!/usr/bin/env node
const prog = require('caporal');
const ptb2 = require('./ptb2.js')// {pt2: equation, pt3: equation2}
prog
  .command ('foo', 'Foo command description')
  // you specify arguments using .argument()
  // 'app' is required, 'env' is optional
  .command('deploy', 'Deploy an application')
  .argument('<a>', 'tham so a', prog.INT)
  .argument('<b>', 'tham so b', prog.INT)
  .argument('<c>', 'tham so c', prog.INT)
  .action(function (args, options, logger) {
     console.log(ptb2(args.a, args.b, args.c));
    // class Ptb2 {
    //   constructor() {
    //   }
    //   ptb2(a, b, c) {
    //     let a_ = parseFloat(a)
    //     let b_ = parseFloat(b)
    //     let c_ = parseFloat(c)

    //     if (isNaN(a_)) {
    //       throw new Error(`a parameter: ${a} is not number`)
    //     }
    //     if (isNaN(a_)) {
    //       throw new Error(`a parameter: ${b} is not number`)
    //     }
    //     if (isNaN(a_)) {
    //       throw new Error(`a parameter: ${c} is not number`)
    //     }
    //     let delta = (b * b) - (4 * a * c)
    //     if (delta < 0) {
    //       throw new Error('Delta nho hon 0')
    //     }
    //     let x1 = (-b + Math.sqrt(delta)) / (2 * a)
    //     let x2 = (-b - Math.sqrt(delta)) / (2 * a)
    //     return [x1, x2]
    //   }
    // }
    // try {
    //   let ptb2 = new Ptb2()
    //   console.log(ptb2.ptb2(args.a,args.b,args.c))
    // } catch (error) {
    //   console.log(error.message)
    // }


   
  });

prog.parse(process.argv);

// ./myprog deploy myapp production --tail 100

