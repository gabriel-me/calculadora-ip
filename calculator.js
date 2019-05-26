function IPvalidation(ip, keyboardEvent) {
  let ipSplit = ip.split('.');
  let countOctet = ipSplit.length;
  if (countOctet === 4 && !isNaN(keyboardEvent.key))
    return true;
  return false;
}

function getClass(ip) {
  ip = ip.split('.');
  if (ip[0] > 0 && ip[0] < 127) return 'A';
  else if (ip[0] > 127 && ip[0] < 192) return 'B';
  else if (ip[0] > 191 && ip[0] < 224) return 'C';
  else return 'undefined';
}