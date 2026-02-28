import { CollectionConfig } from 'payload/types';

export const Homepage: CollectionConfig = {
  slug: 'site-media',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Site Media Structure',
    },
    {
      name: 'homepage',
      type: 'group',
      fields: [
        {
          name: 'showreelVideo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'aboutImages',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'slot',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
            },
          ],
        },
        {
          name: 'ourWorkCards',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'path',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'navbarWorks',
      type: 'group',
      fields: [
        {
          name: 'mediaProduction',
          type: 'group',
          fields: [
            {
              name: 'projectShowcase',
              type: 'array',
              minRows: 6,
              maxRows: 6,
              fields: [
                {
                  name: 'stillLabel',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'stillImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'colorGradedImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'finalOutputVideo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'adCommercials',
          type: 'array',
          minRows: 6,
          maxRows: 6,
          fields: [
            {
              name: 'campaignTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'campaignVideo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
          defaultValue: [
            { campaignTitle: 'LUXURY BRAND CAMPAIGN' },
            { campaignTitle: 'TECH PRODUCT LAUNCH' },
            { campaignTitle: 'FASHION COLLECTION' },
            { campaignTitle: 'AUTOMOTIVE SHOWCASE' },
            { campaignTitle: 'LIFESTYLE BRAND' },
            { campaignTitle: 'CORPORATE IDENTITY' },
          ],
        },
        {
          name: 'fashionEditorial',
          type: 'group',
          fields: [
            {
              name: 'editorialsOneToThree',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              fields: [
                {
                  name: 'editorialLabel',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'categoryPhotographyPrimary',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'categoryPhotographySecondary',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'editorialsFourToFive',
              type: 'array',
              minRows: 2,
              maxRows: 2,
              fields: [
                {
                  name: 'editorialLabel',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'showcaseImages',
              type: 'array',
              minRows: 6,
              maxRows: 6,
              fields: [
                {
                  name: 'showcaseLabel',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'weddingByTMF',
          type: 'group',
          fields: [
            {
              name: 'aboutUsMedia',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                },
              ],
            },
            {
              name: 'ourWorkFeaturedStories',
              type: 'array',
              fields: [
                {
                  name: 'storyTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'storyImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'storyVideo',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'navbarAbout',
      type: 'group',
      fields: [
        {
          name: 'craftingVisualStories',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'everyFrameMatters',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'frontendBindingNotes',
      type: 'textarea',
      admin: {
        description:
          'Bind frontend image/video src values to this document via Payload API/SDK + live preview/revalidation for instant updates.',
      },
    },
  ],
};
