import { HttpPostCliente } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/Errors/Invalid-credentials-erro'
import { UnexpectedError } from '@/domain/Errors/Unexpected-error'
import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostCliente<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
