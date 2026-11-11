
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    content: "Door No. 4/461, 2nd Floor, Valamkoottil Towers, Judgemukku, Thrikkakara P.O., Kakkanad, Kochi, Kerala – 682021, India.",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+91 89210 83214",
    href: "tel:+918921083214",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "Sales@travelhodie.com",
    href: "mailto:Sales@travelhodie.com",
  },
  {
    icon: Clock,
    title: "Customer Support",
    content: "Contact our team for assistance with your travel plans.",
  },
];

export default function ContactInfo() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
        Get in touch
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#071a35]">
        We'd Love to Hear From You
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        Whether you are planning a family holiday, an international trip,
        or need assistance with travel services, we are just a message away.
      </p>

      <div className="mt-8 space-y-6">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon size={22} />
              </div>

              <div>
                <h3 className="font-bold text-[#071a35]">
                  {item.title}
                </h3>

                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-sm leading-6 text-gray-600 transition hover:text-red-600"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="https://wa.me/918921083214"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <MessageCircle size={20} />
        Chat With Us on WhatsApp
      </a>
    </div>
  );
}
