��    *      l  ;   �      �  �  �     O     j     ~     �     �     �  
   �     �  L   �     4     9  	   ?     I     P     f     �  "   �     �  
   �  
   �     �                    #     5     C  	   R     \     m     }     �     �     �     �     �     �  0   �     �     	      �  1     -     -     ,-     9-     N-     d-     q-     v-  S   �-     �-     �-     �-     �-     �-      
.  !   +.  '   M.      u.  
   �.  	   �.     �.     �.     �.     �.     �.     /     /     ./     </     V/     q/     �/     �/  
   �/     �/     �/     �/  6   �/     0     0                 )                          "         &                 $                                    '   !   (              %          	             *                          #              
          <table border="0" cellpadding="0" cellspacing="0" style="padding-top:16px;background-color: #F1F1F1; font-family:Verdana, Arial,sans-serif; color: #454748; width: 100%; border-collapse:separate;"><tbody><tr><td align="center">
<table border="0" cellpadding="0" cellspacing="0" width="590" style="padding:16px;background-color: white; color: #454748; border-collapse:separate;">
<tbody>
    <!-- HEADER -->
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="min-width:590px;background-color: white; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="middle">
                    <span style="font-size:10px;">Incidents</span><br/>
                    <span style="font-size:20px;font-weight: bold;">
                        ${object.name}
                    </span>
                </td><td valign="middle" align="right">
                    <img src="/logo.png?company=1" style="padding:0px;margin: 0px; height: auto; width: 80px;" alt="Altis"/>
                </td></tr>
                <tr><td colspan="2" style="text-align:center;">
                  <hr width="100%" style="background-color:rgb(204,204,204);border:medium none;clear:both;display:block;font-size:0px;min-height:1px;line-height:0; margin: 16px 0px 16px 0px;"/>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
    <!-- CONTENT -->
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="min-width:590px;background-color: white; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="top" style="font-size:13px;">
                    <div>
                        Incident type : ${object.incident_type_id.name}<br/>
                        Date incident : ${object.date.strftime('%d.%m.%Y %H:%M')}<br/>
                        Date end incident : ${object.end_date.strftime('%d.%m.%Y %H:%M')}<br/>
                        Description : ${object.description}<br/>
                        Zones : <ul>
                                % for area in object.area_ids:
                                    <li>${area.name}</li>
                                % endfor
                                </ul>

                        
                        If you do not expect this, you can safely ignore this email.<br/><br/>
                        Thanks,
                    </div>
                </td></tr>
                <tr><td style="text-align:center;">
                  <hr width="100%" style="background-color:rgb(204,204,204);border:medium none;clear:both;display:block;font-size:0px;min-height:1px;line-height:0; margin: 16px 0px 16px 0px;"/>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="min-width:590px;background-color: white; font-size: 11px; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="middle" align="left">
                    Altis
                </td></tr>
                <tr><td valign="middle" align="left" style="opacity:0.7;">
                    +41 27 777 10 01 | <a href="mailto:info@altis.swiss" style="text-decoration:none;color: #454748;">info@altis.swiss</a> | <a href="https://www.altis.swiss/" style="text-decoration:none;color: #454748;">
                        https://www.altis.swiss/
                    </a>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
</tbody>
</table>
</td></tr>
<!-- POWERED BY -->
<tr><td align="center" style="min-width:590px;">
    <table border="0" cellpadding="0" cellspacing="0" width="590" style="min-width:590px;background-color: #F1F1F1; color: #454748; padding: 8px; border-collapse:separate;">
      <tbody><tr><td style="text-align:center;font-size: 13px;">
        Powered by <a target="_blank" href="https://www.odoo.com?utm_source=db&amp;utm_medium=auth" style="color:#875A7B;">Odoo</a>
      </td></tr>
    </tbody></table>
</td></tr>
</tbody></table>
             Activation or deactivation Advertisement title Altis Incident Altis Incident Type Altis Notification type Altis Subscription Altis area Altis incidents Are you sure that you want to notify %s poeple by email and %s people by SMS Area Areas Breakdown Cancel Create the first area Create the first incident Create the first incident type Create the first notification type Create the first subscription Created by Created on Description Display Name Email Incident date Incident end date Incident type Incident types Incidents Last Modified on Last Updated by Last Updated on Name Notification types Notified Notify people SMS Send Subscribers were notified. %s emails and %s sms. Subscription Email Subscriptions Project-Id-Version: Odoo Server 14.0
Report-Msgid-Bugs-To: 
PO-Revision-Date: 2021-03-09 13:50+0100
Last-Translator: 
Language-Team: 
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
Plural-Forms: 
Language: fr_CH
X-Generator: Poedit 2.4.2
 <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;padding-top:16px;background-color: #F1F1F1; font-family:Verdana, Arial,sans-serif; color: #454748; width: 100%; border-collapse:separate;"><tbody><tr><td align="center">
<table border="0" cellpadding="0" cellspacing="0" width="590" style="border-collapse:collapse;padding:16px;background-color: white; color: #454748; border-collapse:separate;">
<tbody>
    <!-- HEADER -->
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="border-collapse:collapse;min-width:590px;background-color: white; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="middle">
                    <span style="font-size:10px;">Incidents</span><br/>
                    <span style="font-size:20px;font-weight: bold;">
                        ${object.name}
                    </span>
                </td><td valign="middle" align="right">
                    <img src="/logo.png?company=1" style="border-style:none;vertical-align:middle;padding:0px;margin: 0px; height: auto; width: 80px;" alt="Altis" width="80" height="94.8438"/>
                </td></tr>
                <tr><td colspan="2" style="text-align:center;">
                  <hr width="100%" style="margin:1rem 0 1rem 0;border-top-color:rgba(0, 0, 0, 0.1);border-top-style:solid;border-top-width:1px;border-left-width:0px;border-bottom-width:0px;border-right-width:0px;overflow-y:visible;overflow-x:visible;height:0px;box-sizing:content-box;background-color:rgb(204,204,204);border:medium none;clear:both;display:block;font-size:0px;min-height:1px;line-height:0; margin: 16px 0px 16px 0px;"/>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
    <!-- CONTENT -->
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="border-collapse:collapse;min-width:590px;background-color: white; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="top" style="font-size:13px;">
                    <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;, Helvetica, Verdana, Arial, sans-serif;">
                        Type d'incident : ${object.incident_type_id.name}<br/>
                        Date de l'incident : ${object.date.strftime('%d.%m.%Y %H:%M')}<br/>
                        Date de fin de l'incident : ${object.end_date.strftime('%d.%m.%Y %H:%M')}<br/>
                        Description : ${object.description}<br/>
                        Zones : <ul style="margin:0px 0 1rem 0;">
                                % for area in object.area_ids:
                                    <li>${area.name}</li>
                                % endfor
                                </ul>

                        
                        Si vous ne vous attendez pas à cela, vous pouvez ignorer cet e-mail en toute sécurité.<br /><br />
                        Merci,
                    </div>
                </td></tr>
                <tr><td style="text-align:center;">
                  <hr width="100%" style="margin:1rem 0 1rem 0;border-top-color:rgba(0, 0, 0, 0.1);border-top-style:solid;border-top-width:1px;border-left-width:0px;border-bottom-width:0px;border-right-width:0px;overflow-y:visible;overflow-x:visible;height:0px;box-sizing:content-box;background-color:rgb(204,204,204);border:medium none;clear:both;display:block;font-size:0px;min-height:1px;line-height:0; margin: 16px 0px 16px 0px;"/>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
    <tr>
        <td align="center" style="min-width:590px;">
            <table border="0" cellpadding="0" cellspacing="0" width="590" style="border-collapse:collapse;min-width:590px;background-color: white; font-size: 11px; padding: 0px 8px 0px 8px; border-collapse:separate;">
                <tbody><tr><td valign="middle" align="left">
                    Altis
                </td></tr>
                <tr><td valign="middle" align="left" style="opacity:0.7;">
                    +41 27 777 10 01 | <a href="mailto:info@altis.swiss" style="background-color:transparent;text-decoration-thickness:initial;text-decoration:none;color: #454748;">info@altis.swiss</a> | <a href="https://www.altis.swiss/" style="background-color:transparent;text-decoration-thickness:initial;text-decoration:none;color: #454748;">
                        https://www.altis.swiss/
                    </a>
                </td></tr>
            </tbody></table>
        </td>
    </tr>
</tbody>
</table>
</td></tr>
<!-- POWERED BY -->
<tr><td align="center" style="min-width:590px;">
    <table border="0" cellpadding="0" cellspacing="0" width="590" style="border-collapse:collapse;min-width:590px;background-color: #F1F1F1; color: #454748; padding: 8px; border-collapse:separate;">
      <tbody><tr><td style="text-align:center;font-size: 13px;">
        Powered by <a target="_blank" href="https://www.odoo.com?utm_source=db&amp;utm_medium=auth" style="background-color:transparent;text-decoration-thickness:initial;color:#875A7B;">Odoo</a>
      </td></tr>
    </tbody></table>
</td></tr>
</tbody></table>
             Mise en ou hors service Titre de l'annonce Notification Type de notification Moyen de notification Souscription Zone Notifications Êtes-vous sûr de vouloir informer %s personnes par e-mail et %s personnes par SMS Zone Zones Panne Annuler Créer la première zone Créer la première notification Créer le premier type d'incident Créer le premier moyen de notification Créer la première souscription Créé par Créé le Communication Nom affiché Email Date de début de l'incident Date de fin de l'incident Type de notification Types de notification Notifications Dernière modification le Dernière mise à jour par Dernière mise à jour le Nom Moyens de notification Notifiées Notifier les personnes SMS Envoyer Les abonnés ont été informés. %s emails et %s sms. Email d'abonnement Abonnements 