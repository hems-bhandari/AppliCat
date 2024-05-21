import React from 'react'

const Privacy = () => {

    return (
        <section className="p-5 space-y-6 ">
            <div className="space-y-1 heading">
                <h1>AppliCat Privacy Policy</h1>
                <p>At AppliCat, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website and services. By accessing or using the AppliCat website and services, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy. Please read this Privacy Policy carefully.</p>
            </div>
            <div className="content space-y-4 pl-5 *:space-y-1">
                <div className="policy">
                    <h2>1. Information We Collect:</h2>
                    <ul>
                        <li><b>Personal Information</b>: When you register for an account on AppliCat, we may collect personal information such as your name, email address, and contact information.</li>
                        <li><b>Payment Information</b>: If you use our services to pay for counseling sessions, we may collect payment information such as credit card details or other payment methods.</li>
                        <li><b>Counseling Preferences</b>: We may collect information about your preferences and requirements for counseling sessions to match you with suitable counselors.</li>
                        <li><b>Usage Information</b>: We may collect information about how you interact with our website and services, including your IP address, browser type, device information, and pages visited.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>2. How We Use Your Information:</h2>
                    <ul>
                        <li><b>To Provide Services</b>: We use your personal information to provide our matchmaking services, connect you with counselors, and facilitate payment transactions.</li>
                        <li><b>To Communicate</b>: We may use your contact information to communicate with you about your account, services, updates, and promotional offers.</li>
                        <li><b>To Improve Our Services</b>:We analyze usage data to improve the functionality and user experience of our website and services.</li>
                        <li><b>To Comply with Legal Obligations</b>: We may use your information to comply with legal requirements, enforce our Terms and Conditions, and protect the rights and safety of our users and others.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>3. Information Sharing and Disclosure:</h2>
                    <ul>
                        <li><b>With Counselors</b>: We share your personal information with counselors to facilitate counseling sessions and transactions.</li>
                        <li><b>With Service Providers</b>:  We may share your information with third-party service providers who assist us in providing our services, such as payment processors and analytics providers.</li>
                        <li><b>For Legal Purposes</b>: We may disclose your information in response to subpoenas, court orders, legal processes, or to establish or exercise our legal rights or defend against legal claims.</li>
                        <li><b>With Your Consent</b>: We may share your information with third parties when you give us explicit consent to do so.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>4. Data Security:</h2>
                    <ul>
                        <li>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>5. Your Choices:</h2>
                    <ul>
                        <li>You can update or delete your account information by logging into your account settings.</li>
                        <li>You can opt-out of receiving promotional emails by following the instructions provided in the emails.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>6. Children &apos; s Privacy:</h2>
                    <ul>
                        <li>AppliCat is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us to request deletion of the information.</li>
                    </ul>
                </div>
                <div className="policy">
                    <h2>7. Changes to this Privacy Policy:</h2>
                    <ul>
                        <li>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</li>
                    </ul>
                </div>

                <p>
                    If you have any questions about these Privacy Policies, please contact us at
                    &nbsp;
                    <a href="mailto:info@applicat.tech" className="text-blue-500 dark:text-blue-400 ">
                        info@applicat.tech.
                    </a>
                    &nbsp;
                    Thank you for using AppliCat!
                </p>
            </div>
        </section>
    )
}

export default Privacy
