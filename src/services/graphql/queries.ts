export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    description
    photo
    userID
  }
}
`
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      photo
      userID
    }
    nextToken
  }
}
`
