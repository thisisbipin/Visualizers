function roots(listOfCoeff) {
  /*"""
    This function creates the polynomial and uses Nerdamer.JS for calculating the roots.
    
    returs:
    list of all the roots possible in STRING
    eg = ['-0.605829586188266534', '-0.302914793094133267-0.524663812003253*i', '-0.5246638120032526*i+0.302914793094132998']
    """*/
  let polynomial = "0";
  for (let i = 0; i < listOfCoeff.length; i++) {
    polynomial = listOfCoeff[i] + "*x^" + i + "+" + polynomial;
  }
  let roots = [];
  let intermediate = nerdamer.solveEquations(polynomial, "x");
  for (let i = 0; i < intermediate.length; i++)
    roots.push(
      nerdamer(intermediate[i].toString(), { x: 0 }).evaluate().text()
    );
  return roots;
}

function transfer_function(num = [], den = []) {
  // Assuming num<denum
  /*"""
    Dono ki eqaul lambi list generate karta hai..

    returns: list of the coeff
    eg: [[0,1,1],[2,3,4]]
    """ */
  let size = den.length - num.length;
  let tf = Array(size).fill(0);
  tf = [[...tf, ...num]];
  tf.push(den);
  return tf;
}

function compute_roots(tf, gains) {
  /*"""
        Takes the Closed Loop TF and computes the roots for plotting

        returns: list of x,y to plot for each lines
    """ */
  let rootsList = [],
    num = tf[0],
    denum = tf[1];
  for (let i = 0; i < gains.length; i++) {
    let gain = gains[i];
    let ch_eq_coeff = [];
    // Here it is  denum + gain * num
    for (let j = 0; j < num.length; j++)
      ch_eq_coeff.push(denum[j] + num[j] * gain);

    let ch_roots = roots(ch_eq_coeff);
    rootsList.push(ch_roots);
  }
  rootsList = transpose(rootsList);
  console.log("rootsList:", transpose(rootsList));
  let newR = [];
  for (let line = 0; line < rootsList.length; line++) {
    let thisone = [];
    for (let j = 0; j < rootsList[0].length; j++) {
      let str = rootsList[line][j].replace("*", "");
      let c = math.Complex(str);
      thisone.push([c.re, c.im]);
    }
    newR.push(transpose(thisone));
  }
  return newR;
}
