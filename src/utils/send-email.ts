import transporter, { accountEmail } from "../config/nodemailer";


export const sendWelcomeEmail = async ({ to, userName }: { to: string; userName: string }) => {
  const htmlTemplate = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="background-color: #0078ff; color: #fff; text-align: center; padding: 24px 16px;">
        <h1 style="margin: 0; font-size: 24px;">Welcome 👋</h1>
      </div>
      <div style="padding: 24px; color: #333;">
        <h2 style="margin-top: 0;">Hi ${userName}!</h2>
        <p style="line-height: 1.6;">
          Your account has been successfully created in the subscription management system. 
          You can now manage your subscriptions, track payments, and access all available features.
        </p>
        <p style="line-height: 1.6;">
          Explore your dashboard and start managing your subscriptions efficiently.
        </p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="#" style="background-color: #0078ff; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
             Go to Dashboard
          </a>
        </div>
      </div>
      <div style="text-align: center; background-color: #f2f2f2; padding: 16px; font-size: 14px; color: #555;">
        © ${new Date().getFullYear()} - All rights reserved.
      </div>
    </div>
  </div>
  `;

  const mailOptions = {
    from: `Subscription Tracker <${accountEmail}>`,
    to,
    subject: "🎉 Welcome!",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log("Error sending email:", error);
    console.log("Welcome email sent:", info.response);
  });
};



export const sendSubscriptionEmail = async ({
  to,
  userName,
  subscriptionName,
  price,
  currency,
  frequency,
  startDate,
}: {
  to: string;
  userName: string;
  subscriptionName: string;
  price: string | number;
  currency: string;
  frequency: string;
  startDate: Date;
}) => {
  const htmlTemplate = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="background-color: #28a745; color: #fff; text-align: center; padding: 24px 16px;">
        <h1 style="margin: 0; font-size: 24px;">Subscription Activated ✅</h1>
      </div>
      <div style="padding: 24px; color: #333;">
        <h2 style="margin-top: 0;">Hi ${userName}!</h2>
        <p style="line-height: 1.6;">
          Your subscription has been successfully activated in the subscription management system.
          You can now enjoy all the benefits available to your plan.
        </p>
        <ul style="line-height: 1.6;">
          <li>Subscription Name: <strong>${subscriptionName}</strong></li>
          <li>Price: ${currency} ${price} (${frequency})</li>
          <li>Start Date: ${startDate}</li>
        </ul>
        <p style="line-height: 1.6;">
          Enjoy your subscription and manage it easily from your dashboard.
        </p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="#" style="background-color: #28a745; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
             View Subscription
          </a>
        </div>
      </div>
      <div style="text-align: center; background-color: #f2f2f2; padding: 16px; font-size: 14px; color: #555;">
        © ${new Date().getFullYear()} - All rights reserved.
      </div>
    </div>
  </div>
  `;

  const mailOptions = {
    from: `Subscription Tracker <${accountEmail}>`,
    to,
    subject: "✅ Your subscription is active",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log("Error sending subscription email:", error);
    console.log("Subscription email sent:", info.response);
  });
};
