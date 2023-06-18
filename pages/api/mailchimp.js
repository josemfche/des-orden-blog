import mailchimpClient from '@mailchimp/mailchimp_marketing';

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX,
  AUDIENCE_ID,
} = process.env;

mailchimpClient.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, firstName, lastName } = req.body;

    try {
      const response = await mailchimpClient.lists.addListMember(AUDIENCE_ID, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      });

      if (response.id !== undefined) {
        res.status(200).json({ message: 'Contact added to Mailchimp' });
      } else {
        res.status(response.statusCode).json({ message: 'Error adding contact to Mailchimp' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error submitting form to Mailchimp' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
