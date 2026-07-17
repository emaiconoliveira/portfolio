export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen pl-96 pr-20 py-32 flex items-center"
    >
      <div>
        <span className="text-purple-400 uppercase tracking-widest">
          Sobre Mim
        </span>

        <h2 className="text-5xl font-black mt-4 mb-8">
          Minha Jornada
        </h2>

        <div className="max-w-3xl text-zinc-400 text-lg leading-8">
          <p>
            Sou Maicon Oliveira, graduado em Ciência da Computação
            e pós-graduando em Cloud Computing.
          </p>

          <p className="mt-6">
            Atuo na área de mídia e tecnologia, com experiência em
            operações, distribuição de conteúdo, automação de tarefas
            e infraestrutura.
          </p>

          <p className="mt-6">
            Tenho interesse em Cloud, DevOps, Automação,
            Inteligência Artificial e Desenvolvimento Web.
          </p>
        </div>
      </div>
    </section>
  );
}
