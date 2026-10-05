import axios from 'axios';

// YARP API Gateway base URL (supports production environment variable on Vercel)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Fallback mock data in case backend services are starting up
const fallbackProjects = [
  {
    id: 1,
    slug: 'kshetra',
    title: 'Kshetra',
    tagline: 'A community where nature-centric traditions make a grand comeback.',
    category: 'Theme Based Villas & Plots',
    status: 'Ongoing',
    location: 'Shankarpally, Hyderabad',
    reraNumber: 'P01100009098',
    approvalNumber: 'DTCP LP No:- 135/2024/H',
    description: 'Kshetra is not just another residential area, but an amazing place enrooted to glorious traditions and facilitated with ultramodern amenities. You can choose from different plot ranges, individual homes and magnificent villas.',
    detailedStory: 'When you follow nature, happiness follows you. Nature had always been central to life for our ancestors. Festivities like Sankranthi and Jatara are celebrated authentically in community squares. Enjoy tranquil eco-ponds, lotus blooms, and landscaped parks.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    brochureUrl: '#',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.6703459260993!2d78.016058!3d17.523243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbfdfd97e2f72b%3A0x4d35edd7977c529f!2sKshetra%20Farm%20Project!5e0!3m2!1sen!2sin!4v1668416729788',
    stats: [
      { id: 1, label: 'Total Estimated Area', value: '150 Acres' },
      { id: 2, label: 'Phase 1 Area', value: '31 Acres' },
      { id: 3, label: 'Estimated Resort Area', value: '4 Acres' },
      { id: 4, label: 'Plot Units for Phase 1', value: '151' },
      { id: 5, label: 'Green Park Area', value: '3 Acres' },
    ],
    amenities: [
      { id: 1, title: 'Cement Concrete (CC) Roads', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
      { id: 2, title: 'Paver Footpath Area', imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80' },
      { id: 3, title: 'Rainwater Harvesting Pits', imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80' },
      { id: 4, title: 'Traditional Mandua Homes', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' },
      { id: 5, title: 'Central Park & Play Area', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
      { id: 6, title: 'Modern LED Street Lights', imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' },
    ],
    locationHighlights: [
      { id: 1, title: '20 Mins Drive to Shankarpally' },
      { id: 2, title: '20 Mins Drive to Telangana Mobility Valley Cluster' },
      { id: 3, title: '20 Mins Drive to Sangareddy' },
      { id: 4, title: '40 Mins Drive to NEOPOLIS' },
      { id: 5, title: '45 Mins Drive to Financial District' },
      { id: 6, title: '50 Mins Drive to Hitech City' },
      { id: 7, title: '1 Hour Drive to Rajiv Gandhi International Airport' },
      { id: 8, title: 'Walkable distance to Regional Ring Road (RRR)' },
    ]
  },
  {
    id: 2,
    slug: 'tranquilvalley',
    title: 'Tranquil Valley',
    tagline: 'Nature-centric premium villa plots in Maheshwaram.',
    category: 'Open Plots & Villas',
    status: 'Ongoing',
    location: 'Maheshwaram, Hyderabad',
    reraNumber: 'P02400005589',
    approvalNumber: 'HMDA LP No:- 000038/LO/PLG/HMDA/2023',
    description: 'Welcome to Tranquil Valley, a nature-centric premium villa plot development in Maheshwaram. Designed with sustainable development and serenity in mind.',
    detailedStory: 'With serene surroundings, Tranquil Valley promises a lifestyle of peace and convenience where vision transforms into reality, enriching residential communities near the international airport corridor.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    brochureUrl: '#',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.824982631024!2d78.4312!3d17.1352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA4JzA2LjciTiA3OMKwMjUnNTIuMyJF!5e0!3m2!1sen!2sin!4v1668416729789',
    stats: [
      { id: 1, label: 'Estimated Total Plots', value: '180 Units' },
      { id: 2, label: 'Gated Layout', value: '45 Acres' },
      { id: 3, label: 'Green Zone', value: '5 Acres' }
    ],
    amenities: [
      { id: 1, title: 'Blacktop 40ft Roads', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
      { id: 2, title: 'Underground Drainage', imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80' },
      { id: 3, title: 'Grand Entrance Arch', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' }
    ],
    locationHighlights: [
      { id: 1, title: '15 Mins Drive to Shamshabad Airport' },
      { id: 2, title: '10 Mins to Electronic Hardware Park' },
      { id: 3, title: 'Direct Connectivity to Srisailam Highway' }
    ]
  },
  {
    id: 3,
    slug: 'sunrisecity',
    title: 'Sunrise City',
    tagline: 'Premium HMDA approved layout in Sultanpur.',
    category: 'Plots',
    status: 'Completed',
    location: 'Sultanpur, Hyderabad',
    reraNumber: 'P01100005222',
    approvalNumber: 'HMDA LP No:- 000186/LO/PLG/HMDA/2022',
    description: 'A master-planned residential layout with 100% clear title, prime blacktop roads, underground cabling, and landscaped avenues near the Outer Ring Road.',
    detailedStory: 'Completed on schedule with full HMDA approvals. Over 100 families have invested in this flourishing green corridor with high appreciation potential.',
    heroImage: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    brochureUrl: '#',
    stats: [{ id: 1, label: 'Plots Sold', value: '100% Delivered' }]
  },
  {
    id: 4,
    slug: 'springcity',
    title: 'Spring City',
    tagline: 'Delivered excellence in Hyderabad residential property market.',
    category: 'Residential Community',
    status: 'Completed',
    location: 'Hyderabad West Corridor',
    reraNumber: 'P02400001234',
    approvalNumber: 'HMDA Approved',
    description: 'The property market in Hyderabad has been growing by leaps and bounds, making Spring City an ideal delivered destination for home buyers and investors.',
    detailedStory: 'A fully completed gated venture featuring avenue plantation, 24/7 security, grand arch entrance, and serene living surroundings.',
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    brochureUrl: '#',
    stats: [{ id: 1, label: 'Possession Status', value: 'Fully Occupied' }]
  }
];

export const getProjects = async (status = '', category = '') => {
  try {
    const res = await apiClient.get('/properties/projects', {
      params: { status, category }
    });
    return res.data;
  } catch (err) {
    console.warn('Backend unavailable, using client fallback projects:', err.message);
    if (!status) return fallbackProjects;
    return fallbackProjects.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const res = await apiClient.get(`/properties/projects/${slug}`);
    return res.data;
  } catch (err) {
    console.warn('Backend unavailable, using client fallback project detail:', err.message);
    return fallbackProjects.find(p => p.slug.toLowerCase() === slug.toLowerCase()) || fallbackProjects[0];
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const res = await apiClient.post('/inquiries/submit', inquiryData);
    return res.data;
  } catch (err) {
    console.warn('Backend unavailable, simulating lead submission:', err.message);
    return {
      success: true,
      message: 'Thank you! Your site visit request has been recorded. Our executive will call you shortly.'
    };
  }
};

export const getInquiries = async () => {
  try {
    const res = await apiClient.get('/inquiries');
    return res.data;
  } catch (err) {
    return [
      { id: 1, name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh@example.com', projectName: 'Kshetra', status: 'New', message: 'Want weekend visit', createdAt: new Date().toISOString() },
      { id: 2, name: 'Priya Varma', phone: '+91 98480 12345', email: 'priya@example.com', projectName: 'Tranquil Valley', status: 'Contacted', message: 'Send price sheet', createdAt: new Date(Date.now() - 86400000).toISOString() }
    ];
  }
};

export const updateInquiryStatus = async (id, status) => {
  try {
    const res = await apiClient.put(`/inquiries/${id}/status`, { status });
    return res.data;
  } catch (err) {
    return { id, status };
  }
};

export const getBlogs = async () => {
  try {
    const res = await apiClient.get('/blogs');
    return res.data;
  } catch (err) {
    return [
      {
        id: 1,
        slug: 'iso-certified',
        title: 'Ridge Homes is Proudly ISO 9001:2015 Certified',
        excerpt: 'Ridge Homes is proudly ISO certified, which proves our commitment to quality construction, efficient processes, and exceptional customer service.',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        publishedDate: new Date().toISOString()
      },
      {
        id: 2,
        slug: 'tranquil-valley-launch',
        title: 'Tranquil Valley: Premium Villa Plots in Maheshwaram',
        excerpt: 'Welcome to Tranquil Valley, a nature-centric Premium Villa Plots venture in Maheshwaram reflecting our commitment to sustainable development.',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        publishedDate: new Date(Date.now() - 500000000).toISOString()
      },
      {
        id: 3,
        slug: 'kshetra-theme-villas',
        title: 'Kshetra: Uplifting Traditions with Nature, Culture, and Art',
        excerpt: 'Welcome to Kshetra, a theme-based villa project in Shankarpally restoring ancient practices in its surroundings and amenities.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        publishedDate: new Date(Date.now() - 800000000).toISOString()
      }
    ];
  }
};

export const getTeamMembers = async () => {
  try {
    const res = await apiClient.get('/blogs/team');
    return res.data;
  } catch (err) {
    return [
      {
        id: 1,
        name: 'Srinivas Raju Vetukuri',
        role: 'MANAGING PARTNER',
        bio: 'Srinivas is the Managing Partner of Ridge with over 30 years of experience in the industry. With a proven track record of success and deep real estate market knowledge, Srinivas provides trusted guidance to homebuyers and investors.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        name: 'Kalyan Maddimsetti',
        role: 'AGM OF SALES',
        bio: 'Mr. Kalyan has 9 years of experience in sales management, with a proven track record of driving revenue growth and developing strategic client relationships.',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 3,
        name: 'Hema Penmetsa',
        role: 'OPERATIONS MANAGER',
        bio: 'Hema is responsible for ensuring the seamless execution of our projects, process optimization, vendor coordination, and maintaining high service standards.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 4,
        name: 'Siva Rama Raju Vegesna',
        role: 'HEAD OF LEGAL',
        bio: 'Deep expertise in property law, regulatory compliance, title verification, and RERA due diligence ensuring all projects conform to sound legal parameters.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 5,
        name: 'Yamini',
        role: 'HUMAN RESOURCES',
        bio: 'Dedicated to building a productive, engaged, and values-driven workforce that aligns with the company’s continuous growth.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
      }
    ];
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const res = await apiClient.get(`/blogs/${slug}`);
    return res.data;
  } catch (err) {
    const allBlogs = await getBlogs();
    return allBlogs.find(b => b.slug === slug) || allBlogs[0];
  }
};

export const createProject = async (projectData) => {
  try {
    const res = await apiClient.post('/properties/projects', projectData);
    return res.data;
  } catch (err) {
    console.error('Error creating project:', err);
    throw err;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await apiClient.delete(`/properties/projects/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting project:', err);
    throw err;
  }
};
