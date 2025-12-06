

import ContactForm from "@/components/home/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    MessageSquare,
    User
} from "lucide-react";


const contactInfo = [
    {
        icon: Mail,
        title: "Email Support",
        details: ["support@coursemaster.com", "sales@coursemaster.com"],
        description: "We respond within 24 hours",
    },
    {
        icon: Phone,
        title: "Phone Support",
        details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
        description: "Mon-Fri, 9am-6pm EST",
    },
    {
        icon: MapPin,
        title: "Headquarters",
        details: ["123 Learning Street", "San Francisco, CA 94107"],
        description: "Visit our office",
    },
    {
        icon: Clock,
        title: "Response Time",
        details: ["24/7 Email Support", "Weekday Phone Support"],
        description: "Quick assistance guaranteed",
    },
];

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer: "Simply browse our courses, click 'Enroll Now', and follow the checkout process. You can start learning immediately.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee for all courses if you're not satisfied with your purchase.",
    },
    {
        question: "Can I access courses on mobile?",
        answer: "Yes, all our courses are accessible on desktop, tablet, and mobile devices through our responsive platform.",
    },
    {
        question: "Do courses offer certificates?",
        answer: "Yes, you'll receive a certificate of completion for every course you finish.",
    },
];

export default function ContactPage() {


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-linear-to-r from-blue-200 to-purple-200 py-18">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl text-gray-800 md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Get in touch with our team. We're here to help with any questions about our courses.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <info.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{info.title}</h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600">{detail}</p>
                                            ))}
                                            <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* FAQ */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="pb-4 border-b last:border-0">
                                            <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                                            <p className="text-sm text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="mt-4 px-0">
                                    View all FAQs →
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a message</CardTitle>
                                <p className="text-gray-600">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>

                        {/* Map/Office Info */}
                        <Card className="mt-8">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Our Office</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">123 Learning Street</p>
                                                    <p className="text-gray-600">San Francisco, CA 94107</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Business Hours</p>
                                                    <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                                        <p className="text-gray-500">Map Location</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}