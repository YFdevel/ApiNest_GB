import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {Posts} from "../dto/post.dto";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    is_equal(prev:string,next:string){
        if(prev==next){
           prev=`<span>${prev}</span>`
        }
            prev=`<span style="font-weight: bold">Было: ${prev}</span>  <span>Стало: ${next}</span> `
        return prev;
    }

     sendLogMessage(addressTo: string) {
        return this.mailerService
            .sendMail({
                to: addressTo,
                subject: 'Создание нового комментария!',
                template: 'test',
            })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
    updateLogMessage(addressTo: string, prevPost:Posts, nextPost:Posts) {
        for (const prevKey in prevPost) {
            for (const nextKey in nextPost) {
                if(nextKey===prevKey && prevKey!=='id' && prevKey!=='createdAt'){
                    prevPost[prevKey]=this.is_equal( prevPost[prevKey], nextPost[nextKey]);
                }
            }
        }
        return this.mailerService
            .sendMail({
                to: addressTo,
                subject: 'Обновление данных!',
                template: 'update',
                context: prevPost
            })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
}
