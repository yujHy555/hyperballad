import { SectionInfo } from '../types';

export const SECTIONS: SectionInfo[] = [
  { id: 'hero', title: 'HYPERBALLAD', subtitle: 'Geometry & Patterns' },
  { id: 'collaboration', title: '01. COLLABORATION', subtitle: 'Rory Mayne × Visuals, Musicians & DJs', categoryNumber: '01' },
  { id: 'session', title: '02. RECORDING', subtitle: 'Chladni Harmonics', categoryNumber: '02' },
  { id: 'performance', title: '03. PERFORMANCE', subtitle: 'Organic Kinetics', categoryNumber: '03' },
  { id: 'beat', title: '04. BEAT MATRIX', subtitle: 'Euclidean & Phyllotaxis', categoryNumber: '04' },
  { id: 'archive', title: '05. ARCHIVE', subtitle: 'Natural Patterns & Bookings', categoryNumber: '05' },
];

export const MOBILE_SECTIONS: SectionInfo[] = [
  { id: 'hero', title: 'HYPERBALLAD', subtitle: 'Patterns & Sound' },
  { id: 'collaboration', title: 'COLLABORATION', subtitle: 'Rory Mayne × Guests' },
  { id: 'beat', title: 'BEAT MATRIX', subtitle: 'Euclidean & Phyllotaxis' },
  { id: 'archive', title: 'ARCHIVE', subtitle: 'Contact & Bookings' },
];
