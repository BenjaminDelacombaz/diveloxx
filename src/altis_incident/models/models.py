# -*- coding: utf-8 -*-

from odoo import models, fields, _


class Partner(models.Model):
    _inherit = 'res.partner'

    # Field Declarations
    x_primary_key = fields.Integer(string="Laravel ID")


class IncidentType(models.Model):
    _name = 'altis.incident_type'
    _description = 'Altis Incident Type'

    # Field Declarations
    name = fields.Char(string="Name", required=True, translate=True)


class Area(models.Model):
    _name = 'altis.area'
    _description = 'Altis area'

    # Field Declarations
    name = fields.Char(string="Name", required=True)


class NotificationType(models.Model):
    _name = 'altis.notification_type'
    _description = 'Altis Notification type'

    # Field Declarations
    name = fields.Char(string="Name", required=True, translate=True)


class Subscription(models.Model):
    _name = 'altis.subscription'
    _description = 'Altis Subscription'

    # Field Declarations
    area_id = fields.Many2one('altis.area', ondelete='cascade', string="Area", required=True)
    partner_id = fields.Many2one('res.partner', ondelete='cascade', string="Contact", required=True)
    incident_type_ids = fields.Many2many('altis.incident_type', string='Incident types', required=True)
    notification_type_ids = fields.Many2many('altis.notification_type', string='Notification types', required=True)


class Incident(models.Model):
    _name = 'altis.incident'
    _inherit = ['mail.thread', 'mail.activity.mixin', ]
    _description = 'Altis Incident'

    # Field Declarations
    area_ids = fields.Many2many('altis.area', string="Areas", required=True)
    incident_type_id = fields.Many2one('altis.incident_type', ondelete='cascade', string="Incident type", required=True)
    date = fields.Datetime(string="Incident date", required=True)
    end_date = fields.Datetime(string="Incident end date", required=True)
    name = fields.Char(string="Advertisement title", required=True, translate=True)
    description = fields.Text(string="Description", required=True, translate=True, help='Not required')
    notified = fields.Boolean(string="Notified", default=False, readonly=True)

    def action_notify_people(self):
        """ This Action notifies the contact via mail and sms template assigned to the linked model"""
        notification_type_email_id = self.env.ref('altis_incident.nt_email').id
        notification_type_sms_id = self.env.ref('altis_incident.nt_sms').id
        subscriptions = self.env['altis.subscription'].search(
            [('area_id', 'in', self.area_ids.ids), ('partner_id', '!=', False)])
        subscriptions_email = subscriptions.filtered(
            lambda s: notification_type_email_id in s.notification_type_ids.ids)
        subscriptions_sms = subscriptions.filtered(lambda s: notification_type_sms_id in s.notification_type_ids.ids)
        email_partners = subscriptions_email.mapped('partner_id')
        sms_partners = subscriptions_sms.mapped('partner_id')
        compose_form = self.env.ref('altis_incident.incident_mail_wizard_form', False)
        message = _("Are you sure that you want to notify %s poeple by email and %s people by SMS") % (
            len(email_partners), len(sms_partners))
        ctx = dict(
            default_message=message,
        )
        return {
            'name': _('Subscription Email'),
            'type': 'ir.actions.act_window',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'incident.mail.wizard',
            'views': [(compose_form.id, 'form')],
            'view_id': compose_form.id,
            'target': 'new',
            'context': ctx,
        }

    def get_area_name(self):
        area = ','.join(a.name for a in self.area_ids)
        return area
