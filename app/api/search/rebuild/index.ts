const cleanContentType = async () => {
console.log('666666666666');
return 

}
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let authorized = false
  const fullRebuild = req.query.fullRebuild === 'true'
  const contentType = req.query.contentType as string
  const authorizedMessage = fullRebuild
    ? `Authorized: Attempting to fully rebuild the search index${
        contentType ? ` for ${contentType}` : ''
      }.`
    : `Authorized: Attempting to update the search index${
        contentType ? ` for ${contentType}` : ''
      }.`

  if (req.query.key === process.env.CRON_KEY) {
    console.log('111111111111');
    
    if (!contentType || isContentType(contentType)) {
      console.log('2222222222');
      authorized = true
      res.status(200).end(authorizedMessage)
    } else {
      console.log('3333333333');
      console.log('Bad Request: Invalid contentType', contentType)
      res.status(400).end('END')
    }
  } else {
    console.log('444444444444');
    console.log('Unauthorized request')
    res.status(401).end('Unauthorized')
  }

  if (authorized) {
    console.log('55555555555');
    console.log(authorizedMessage)

    const space = await createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN as string,
    }).getSpace(process.env.CONTENTFUL_SPACE_ID as string)
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT as string
    )
    // contentfulClient is a subtly different API than environment
    const contentfulClient = initContentfulClient(
      process.env.CONTENTFUL_SPACE_ID as string,
      process.env.CONTENTFUL_ENVIRONMENT as string,
      process.env.CONTENTFUL_ACCESS_TOKEN as string
    )

    if (!contentType) {
      await cleanContentType()
    }
    if (!contentType) {
      await cleanContentType()
    }
  }
}

export default handler
