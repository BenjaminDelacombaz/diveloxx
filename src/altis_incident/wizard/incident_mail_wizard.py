# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, _


class IncidentMailWizard(models.TransientModel):
    _name = 'incident.mail.wizard'
    _description = 'IncidentMmail wizard'

    message = fields.Char('message', readonly=True)

    def action_send_mail(self):
        active_id = self._context.get('active_id')
        incident = self.env['altis.incident'].browse(active_id)
        notification_type_email_id = self.env.ref('altis_incident.nt_email').id
        notification_type_sms_id = self.env.ref('altis_incident.nt_sms').id
        subscriptions = self.env['altis.subscription'].search([
            ('area_id', 'in', incident.area_ids.ids),
            ('partner_id', '!=', False),
        ])
        subscriptions_email = subscriptions.filtered(
            lambda s: notification_type_email_id in s.notification_type_ids.ids)
        subscriptions_sms = subscriptions.filtered(lambda s: notification_type_sms_id in s.notification_type_ids.ids)
        email_partners = subscriptions_email.mapped('partner_id')
        sms_partners = subscriptions_sms.mapped('partner_id')
        ctx = self.env.context.copy()
        # TODO: Wierd Logic with lang (Should be improved with read group?)
        if email_partners:
            email_partner_id_by_lang = {}
            for partner in email_partners:
                lang = partner.lang or ctx.get('lang') or 'en_US'
                if lang not in email_partner_id_by_lang:
                    email_partner_id_by_lang[partner.lang] = [partner.id]
                else:
                    email_partner_id_by_lang[partner.lang].append(partner.id)
            template = self.env.ref('altis_incident.incident_email_template', False)
            for lang, pids in email_partner_id_by_lang.items():
                ctx.update({
                    'email_partners': ",".join(str(pid) for pid in pids),
                    'partner_lang': lang
                })
                template.with_context(ctx).send_mail(incident.id)

        if sms_partners:
            sms_partner_id_by_lang = {}
            for partner in sms_partners:
                lang = partner.lang or ctx.get('lang') or 'en_US'
                if lang not in sms_partner_id_by_lang:
                    sms_partner_id_by_lang[partner.lang] = [partner.id]
                else:
                    sms_partner_id_by_lang[partner.lang].append(partner.id)
            template = self.env.ref('altis_incident.sms_template_data_altis_incident', False)
            for lang, pids in sms_partner_id_by_lang.items():
                incident.with_context(partner_lang=lang)._message_sms_with_template(
                    template=template.with_context(partner_lang=lang),
                    partner_ids=pids,
                    put_in_queue=False
                )
        message_cha = _("Subscribers were notified. %s emails and %s sms.") % (len(email_partners), len(sms_partners))
        incident.message_post(body=message_cha)
        incident.notified = True
