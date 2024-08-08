import { Footer } from '@/components/Footer';
import PrivacyPolicyPage from '../../components/(pp)/PrivacyPolicy';
import { Header } from '@/components/Header';

export default function PP() {
    return (
        <div>
            <Header />
            <PrivacyPolicyPage />
            <Footer />
        </div>
    )
}