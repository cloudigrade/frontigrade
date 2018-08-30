import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { I18nextProvider, reactI18nextModule } from 'react-i18next';
import i18nextXhr from 'i18next-xhr-backend';

const i18nInit = lng =>
  i18next
    .use(i18nextXhr)
    .use(reactI18nextModule)
    .init({
      backend: {
        loadPath: process.env.REACT_APP_CONFIG_SERVICE_LOCALES_PATH
      },
      fallbackLng: 'en',
      lng,
      ns: ['default'],
      defaultNS: 'default',
      react: {
        wait: true
      }
    });

const I18n = ({ children, locale }) => <I18nextProvider i18n={i18nInit(locale)}>{children}</I18nextProvider>;

I18n.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string
};

I18n.defaultProps = {
  locale: null
};

export { I18n as default, i18nInit, I18n };
