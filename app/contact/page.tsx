import type { Metadata } from 'next';
import { Contact } from '@/components/contact/Contact';
import './contact.css';

export const metadata: Metadata = {
  title: 'Contact DISCOVER Supply Chain',
  description: 'Questions about the DISCOVER Summit, sponsorship or membership? Email info@discover-org.us or call 800-380-1408. A real person replies within 2 business days.',
};

export default function ContactPage() {
  return <div data-page="contact"><Contact /></div>;
}
