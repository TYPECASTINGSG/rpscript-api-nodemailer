import {expect} from 'chai';
import m from 'mocha';

import nodemailer from 'nodemailer';
import RPSNodemailer from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('NodeMailer', () => {

  m.it('should send out email', async function () {
    let mailer = new RPSNodemailer
    let ctx = new RpsContext

    let info = await mailer.sendEmail(ctx,{},
      "email@jameschong.me","wei3hua2@gmail.com","sent from rpscript","cool stuff", "<b>Indeed</b>");
    
      console.log(info);
      console.log('=>'+nodemailer.getTestMessageUrl(info));
    // console.log(result);

  }).timeout(0);

})
