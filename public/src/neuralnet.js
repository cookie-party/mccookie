import nj from './lib/numjs';
import params from './lib/params';

export default class NN {
  constructor(){
    this.state = {
    };
  }

  argmax(x) {
    const i = 0;
    let idx;
    let max = -Infinity;
    x.tolist().forEach((n, i)=> {
      if(n > max) {
        idx = i;
        max = n;
      }
      i++;
    });
    return idx;
  }

  predict(x) {
    const a1 = nj.dot(x, params.w1).add(params.b1);
    const z1 = nj.sigmoid(a1);
    const a2 = nj.dot(z1, params.w2).add(params.b2);
    const z2 = nj.sigmoid(a2);
    const a3 = nj.dot(z2, params.w3).add(params.b3);
    const z3 = nj.softmax(a3);
    //const a4 = nj.dot(z3, params.w4).add(params.b4);
    //const z4 = nj.softmax(a4);
    return z3;
  }

  dup_array_like(array_like) {
    const list = new Array();
    for (let i = 0; i < array_like.length; i++) {
      list.push(array_like[i]);
    }
    return list;
  }

  recognize(ctx) {
    //console.log('recognize');
    const image = ctx.getImageData(0, 0, 224, 224).data;
    let img = nj.array(this.dup_array_like(image)).reshape(224, 224, 4);
    img = nj.images.resize(img, 28, 28);
    img = nj.images.rgb2gray(img);
    img = nj.ones(img.shape).multiply(255).subtract(img);

    const x = nj.divide(img, 255.0).reshape(28 * 28);
    const y= this.predict(x);
    const probs = {};
    for (let i = 0; i < 10; i++) {
      probs[i]=(y.get(i) * 100).toString().slice(0, 4);
    }
    const ret = {probs: probs, img: img, result: this.argmax(y)};
    return ret;
  }

}