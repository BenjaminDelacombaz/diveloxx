# -*- coding: utf-8 -*-
{
    'name': "Altis incident",

    'summary': """Manage incident for altis""",

    'description': """
        Manage incident for altis by Dootix v16
        Task id v16: 3196564
    """,

    'author': "Odoo PS",
    'website': "http://www.odoo.com",tutu

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Administration',
    'version': '16.0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'contacts', 'sms'],

    # always loaded
    'data': [
        # Security
        'security/security.xml',
        'security/ir.model.access.csv',
        'wizard/incident_mail_wizard_view.xml',
        # Data
        'data/altis_incidents_sms.xml',
        'data/notification_data.xml',
        'data/area_data.xml',
        'data/incident_type_data.xml',
        'data/incident_mail_template.xml',
        # Views
        'views/altis.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
