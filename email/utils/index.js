const validator = require('validator');
const dgram = require('dgram');
const dnsPacket = require('dns-packet');

const email = 'godsgiftuko@ssl_.com'; // Enter email address

class EmailUtils {
  static async validateEmail(email) {
    return new Promise((resolve, reject) => {
      if (!validator.isEmail(email)) {
        resolve(false);
      }

      const domain = email.split('@')[1];
      const packet = dnsPacket.encode({
        type: 'query',
        id: 1,
        flags: dnsPacket.RECURSION_DESIRED,
        questions: [
          {
            type: 'MX',
            name: domain,
          },
        ],
      });

      const socket = dgram.createSocket('udp4');

      socket.send(packet, 0, packet.length, 53, '8.8.8.8');

      socket.on('message', (message) => {
        const response = dnsPacket.decode(message);

        if (response.answers.some((answer) => answer.type === 'MX')) {
          resolve(true);
        } else {
          resolve(false);
        }

        socket.close();
      });
    });
  }
}

// Test
EmailUtils.validateEmail(email)
.then((data) => {
    console.log(data);
})
