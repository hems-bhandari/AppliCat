import React from 'react'

const Privacy = () => {
    return (
        <section className=" p-5  space-y-6">
            <div className="heading space-y-1">
                <h1>AppliCat Terms and Conditions</h1>
                <p>Welcome to AppliCat! These Terms and Conditions govern your use of the AppliCat website and services. By accessing or using our website and services, you agree to comply with these Terms and Conditions. Please read them carefully.</p>
            </div>
            <div className="content space-y-4 pl-5 *:space-y-1">
                <div className="policy">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the AppliCat website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, you may not access or use the website and services.</p>
                </div>

                <div className="policy">
                    <h2>2. Description of Services</h2>
                    <p>AppliCat provides a platform that connects incoming freshmen from top universities with high school students seeking paid counseling and guidance at low rates. AppliCat does not provide counseling or guidance services directly but facilitates the connection between students and counselors.</p>
                </div>

                <div className="policy">
                    <h2>3. User Eligibility</h2>
                    <p>Users of AppliCat must be at least 18 years old or the legal age of majority in their jurisdiction. High school students seeking counseling must obtain parental consent before using the services.</p>
                </div>

                <div className="policy">
                    <h2>11. Governing Law</h2>
                    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of Nepal. Any dispute arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Nepal.</p>
                </div>

                <p>
                    If you have any questions about these Terms and Conditions, please contact us at
                    &nbsp;
                    <a href="mailto:info@applicat.tech" className="dark:text-blue-400 text-blue-500 ">
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
