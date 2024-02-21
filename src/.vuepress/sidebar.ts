import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: "Pricing",
      link: "/docs/pricing"
    },
    {
      text: 'About j2cc',
      children: [
        {
          text: 'Who\'s behind j2cc?',
          link: '/docs/who_is_behind_j2cc'
        },
        {
          text: 'Techniques',
          link: '/docs/techniques',
          children: [
            {
              text: "Flow Obfuscation",
              link: "/docs/techniques.html#flow-obfuscation"
            },
            {
              text: "Simple Reference Obfuscation",
              link: "/docs/techniques.html#simple-reference-obfuscation"
            },
            {
              text: "Unused Member Removal",
              link: "/docs/techniques.html#unused-member-removal"
            },
            {
              text: "String Literal Obfuscation",
              link: "/docs/techniques.html#string-literal-obfuscation"
            },
            {
              text: "Disabling Verifier",
              link: "/docs/techniques.html#verifier-disabler-at-runtime"
            },
            {
              text: "Method Inlining",
              link: "/docs/techniques.html#method-inlining"
            },
            {
              text: "Native BSM Reference Obfuscation",
              link: "/docs/techniques.html#reference-obfuscation-via-native-bsm"
            },
            {
              text: "Optimizing",
              link: "/docs/techniques.html#optimizing"
            }
          ]
        },
      ]
    },
    {
      text: 'Getting Started',
      children: [
        {
          text: 'Getting started',
          link: '/docs/start'
        },
        {
          text: 'Configuring',
          link: '/docs/configuring'
        },
      ]
    },
    {
      text: 'Advanced Topics',
      // prefix: "docs/",
      children: [
        {
          text: "Annotations",
          link: "/docs/annotations"
        },
        {
          text: 'Libraries',
          link: '/docs/libraries',
        },
        {
          text: 'Bug Reporting',
          link: '/docs/bugs'
        },
        {
          text: "License Management",
          link: "/docs/licensing"
        }
      ]
    }
  ],
});