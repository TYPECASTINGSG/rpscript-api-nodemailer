/**
 * @module nodemailer
 */

import nodemailer, { Transporter,SentMessageInfo } from 'nodemailer';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

@RpsModule("nodemailer")
export default class RPSNodemailer {

  @rpsAction({verbName:'send-email'})
  async sendEmail (ctx:RpsContext,opts:Object, from:string, to:string, 
                   subject?:string,text?:string,html?:string) : Promise<SentMessageInfo>{
    
    let mailOptions = {from: from,to: to,subject: subject,text: text,html: html};
    let transporter = await this.createTransporter();

    return new Promise( (resolve,reject) => {
      transporter.sendMail(mailOptions, (err,info)=> {
        if(err)reject(err);
        else resolve(info);
      });
    });
    
  }

  private async createTransporter () :Promise<Transporter>{
    return new Promise<Transporter>((resolve,reject) => {
      nodemailer.createTestAccount((err,account)=>{
        if(err) reject(err);
        else {
          let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',port: 587,secure: false,
            auth: {user: account.user,pass: account.pass}
          });

          resolve(transporter);
        }
      });
    });

  }

}

