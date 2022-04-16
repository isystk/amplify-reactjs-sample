import MainService from '@/services/main'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { getPost, listPosts } from '@/services/graphql/queries'
import { createPost, updatePost, deletePost } from '@/services/graphql/mutations'
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

  async listPosts() {
    const postData = (await API.graphql(graphqlOperation(listPosts))) as GraphQLResult
    // @ts-ignore
    const filterPosts = _.filter(postData.data.listPosts.items, (post) => !post._deleted)
    this.posts = _.mapKeys(filterPosts, 'id')
    await this.main.setAppRoot()
  }

  listMyPosts(): Post[] {
    if (!this.main.auth.id) return []
    return _.filter(this.posts, (post) => post.userID === this.main.auth.id)
  }

  async getPost(id: string) {
    const postData = await API.graphql(graphqlOperation(getPost, { id }))
    // @ts-ignore
    this.posts[id] = postData.data.getPost
    await this.main.setAppRoot()
  }

  async createPost(post: Post) {
    const input = {
      ...post,
      userID: this.main.auth.id,
    }
    await API.graphql(graphqlOperation(createPost, { input }))
    await this.listPosts()
  }

  async updatePost(post: Post) {
    const input = {
      ...post,
      userID: this.main.auth.id,
      _version: this.posts[post.id]._version,
    }
    await API.graphql(graphqlOperation(updatePost, { input }))
    await this.listPosts()
  }

  async deletePost(postId: string) {
    const input = {
      id: postId,
      _version: this.posts[postId]._version,
    }
    await API.graphql(graphqlOperation(deletePost, { input }))
    await this.listPosts()
  }
}
