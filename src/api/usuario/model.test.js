import { Usuario } from '.'

let usuario

beforeEach(async () => {
  usuario = await Usuario.create({ email: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = usuario.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(usuario.id)
    expect(view.email).toBe(usuario.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = usuario.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(usuario.id)
    expect(view.email).toBe(usuario.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
