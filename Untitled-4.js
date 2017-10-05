function fearNotLetter(str) {
  
  let letters = str.toLowerCase().split(''),
      ut8     = letters.map(letter => letter.charCodeAt(0)).sort((a,b) => a-b),
      minStr  = ut8.slice(0,1).join(''),
      min     = parseInt(minStr),
      maxStr  = ut8.slice(-1).join(''),
      max     = parseInt(maxStr),
      range   = min + '\\-\\' + max,
      alpha   = new RegExp('[^' + range + ']', 'i');
  
  for (var i = min; i < max; i++) {
    if (str.indexOf(String.fromCharCode(i)) == -1) {
      console.log(String.fromCharCode(i));
    } else {
      return undefined; 
    }
  }
}

fearNotLetter("abcE");