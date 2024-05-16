import validator from 'validator';
import * as dgram from 'dgram';
import * as dnsPacket from 'dns-packet';

const email = 'godsgiftuko@some_provider.com'; // Enter email address

class EmailUtils {
  static isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static async validateEmail(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const validEmail = await validator.isEmail(email);
        if (!validEmail) {
          resolve(false);
        }
      } catch (e) {
        throw new Error('Error validationg email address');
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
        const answers = dnsPacket.decode(message).answers;

        if (Array.isArray(answers) && answers.some((answer) => answer.type === 'MX')) {
          resolve(true);
        } else {
          resolve(false);
        }

        socket.close();
      });
    });
  }

  static getSmtpDomain(host: string) {
    return host.split('.')[1];
  }
}

// Test
EmailUtils.validateEmail(email)
.then((data) => {
    console.log(data);
})
