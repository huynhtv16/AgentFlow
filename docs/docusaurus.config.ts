import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from "@docusaurus/preset-classic";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: 'AgentFlow Documentation',
  favicon: 'img/favicon.ico',
  url: 'https://example.com',
  baseUrl: '/',
  
  onDuplicateRoutes: 'ignore',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
         api: {  // Make sure this matches the sidebar ID
            specPath: "./agentflow.openapi.yml", // Ensure correct path
            outputDir: "docs/api", // This must match sidebars.ts
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          }
        }
      },
    ]
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          docItemComponent: '@theme/ApiItem',
          docRootComponent: "@theme/DocRoot",
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    algolia: {
      appId: 'HZFTKC6J5D',          // Optional: required if your DocSearch config uses it
      apiKey: '8e9db8266e2edda55250eada5c86d4a4',   // Public API key; safe to commit
      indexName: 'agentflow',    // The index provided by Algolia
      contextualSearch: true,          // Optional: adjusts search results by language/version
      // Optional parameters:
      // searchParameters: {},
      // searchPagePath: 'search',
    },
    navbar: {
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'intro',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Huynh Tran.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
