import MainService from '@/services/main'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getPost, listPosts } from '@/services/graphql/queries'
import { createPost } from '@/services/graphql/mutations'
import { Post } from '@/services/models'
import * as _ from 'lodash'

export type Posts = {
  [id: string]: Post
}

export default class PostService {
  main: MainService

  posts: Posts

  constructor(main: MainService) {
    this.main = main
    this.posts = {}
  }

  async getPosts() {
    const postData = await API.graphql(graphqlOperation(listPosts))
    // @ts-ignore
    this.posts = _.mapKeys(postData.data.listPosts.items, 'id')
    await this.main.setAppRoot()
  }

  async getPost(id: string) {
    const postData = await API.graphql(graphqlOperation(getPost, { id }))
    // @ts-ignore
    this.posts[id] = postData.data.getPost
    await this.main.setAppRoot()
  }

  async createPost(post: Post) {
    await API.graphql(graphqlOperation(createPost, { input: post }))
    await this.getPosts()
  }
}
