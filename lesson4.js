'use strict'

const text = `'You'll never guess what I've just seen!' said Sam, excitedly.
'What's that?' asked Louise.
'Our teacher has a broomstick and a black pointy hat in the back of her car. Maybe she's a witch!'
'No, silly! They're for the school play!' replied Louise, sighing.`

function quotaSwap(txt) {
    const regexp = /\'(.*?)\'([ ,\n])/gm
    return txt.replace(regexp, '\"$1\"$2')
}


console.log(quotaSwap(text))