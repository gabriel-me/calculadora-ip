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

function getTheNumberOfHosts(typeNetwork) {
  if (isNaN(typeNetwork)) 
    typeNetwork = typeNetwork.split('/')[1];
  return ((2 ** ((32 - typeNetwork))) - 2);
}

function convertDecimalToBinary(ip) {
  ip = ip.split('.');
  let sum = 0;
  const sequence = [128, 64, 32, 16, 8, 4, 2, 1];

  let result = [
    { decimal: ip[0], binary: '' },
    { decimal: ip[1], binary: '' },
    { decimal: ip[2], binary: '' },
    { decimal: ip[3], binary: '' }
  ];

  result.forEach(octet => {
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] < octet.decimal) {
        octet.binary += 1;
        sum = sequence[i];
        for (let j = i + 1; j < sequence.length; j++) {
          if (sum + sequence[j] <= octet.decimal) {
            sum += sequence[j];
            octet.binary += 1;
          } else {
            octet.binary += 0;
          }
        }
        break;
      } else {
        octet.binary += 0;
      }
    }
  });

  return result;
}