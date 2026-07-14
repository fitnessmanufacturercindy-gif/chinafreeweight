export default function PortugueseInquiryForm() {
  return (
    <form className="quote-form" action="https://formsubmit.co/kloe@powerbasefit.com" method="POST">
      <input type="hidden" name="_subject" value="Nova solicitação em português — ChinaFreeWeight" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://www.chinafreeweight.com/pt/contato?inquiry=sent#consulta" />
      <input type="hidden" name="source" value="ChinaFreeWeight página em português" />
      <input type="text" name="_honey" className="spam-field" tabIndex={-1} autoComplete="off" />
      <label>Nome <span className="required-mark">*</span><input name="name" type="text" placeholder="Seu nome completo" required /></label>
      <label>E-mail corporativo <span className="required-mark">*</span><input name="email" type="email" placeholder="nome@empresa.com" required /></label>
      <label>WhatsApp / telefone <span className="required-mark">*</span><input name="phone" type="tel" placeholder="+55 11 99999 9999" required /></label>
      <label>Empresa<input name="company" type="text" placeholder="Nome da empresa ou academia" /></label>
      <label>País / região<input name="country" type="text" placeholder="Brasil" /></label>
      <label>Produtos de interesse<input name="productDemand" type="text" placeholder="Halteres, anilhas, OEM, projeto de academia..." /></label>
      <label>Categoria<select name="productCategory" defaultValue=""><option value="">Selecione</option><option>Halteres</option><option>Anilhas</option><option>Bumper Plates</option><option>OEM / marca própria</option><option>Solução para academia</option></select></label>
      <label>Quantidade estimada<input name="quantity" type="text" placeholder="Ex.: 200 pares / 1 contêiner" /></label>
      <label>Tipo de projeto<select name="projectType" defaultValue=""><option value="">Selecione</option><option>Distribuição / importação</option><option>Marca própria</option><option>Nova academia</option><option>Varejo</option></select></label>
      <label className="full">Mensagem<textarea name="message" placeholder="Informe pesos, quantidades, logo, embalagem, destino e prazo desejado." /></label>
      <button type="submit">Solicitar cotação</button>
    </form>
  );
}
