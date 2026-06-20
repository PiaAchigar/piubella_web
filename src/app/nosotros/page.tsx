import Image from 'next/image'

export default function Nosotros() {
  // const partnerLogos = [
  //   'https://lh3.googleusercontent.com/aida-public/AB6AXuBrAtC_J_3Ln2LfvAcJxHK4ckXWJzwKLF1FYKKeCP6c0iZVEIwIpd5Gu53YoFPr4UZhjYYosVvpHsMihPcPYLWdkuQwfxGUPz3CXVqrdypx8YtPFOfeK4A0Hnw9o-1ctrhnlTWcN0_A2cz4zvL8nJquPdJYbkf3FKWEf8Ayv_n93Hhc3Zc5B-mka8wWmC4aRYbTZ6ZSx_tbeMFZNXt2Exlmq0DbaVWYn-lwnmQtCr_CyyKyvkhFM3zCRnPsL_AngnuPdMWxKj60PNQg',
  //   'https://lh3.googleusercontent.com/aida-public/AB6AXuD9MEqfF7DWos94UbtLd-8GSOiYwWg0gw7bYtSKyiey4RLSE-lqDUZLILIy6_Q0FGvl_T3JByEmdT4xFBuEcrx0W4IeTxvbIyiN_gE-R-1FmLZZEWoUSpqGchSXM57eTTqXVkyHKF7JV80s5saS6vauLnd6glm_YUwLIxNncMcMbm9zyUOjEh07qXByGzGnrU4c5BwiUuqV88d8y2V_dmsU8rzr0r2-aLpLu2rwUkJU-GQ5fu1qh2QMTTeSchvIJHEIkv7rW4kiHnCU',
  //   'https://lh3.googleusercontent.com/aida-public/AB6AXuAlD8LX-Lahhmpx5MXuC8cQeLaQmexOHUNB2ceGGUNdVAHLumEwX9RyKYRD9KrBLC9RC5xKBqt14Wyquy1bkK566AfynlMuJUVUZwICkJ5bpT_rbHRTisuNOA78Ejk9t5Qcz3dUp6ACXpx4tXA_kh9NWW_SiYztxqgE1LE8Vsm3OauOKmfwShDNjM0GVX6lvfENUGQmG_5tuY5PWArwyKDKGtosWyizJ9-g4dUlIUNKsV38qBceyKAFTNY6ddpZQkcvn0KGK0NJUgHi',
  //   'https://lh3.googleusercontent.com/aida-public/AB6AXuA2w1B5obZzftkwYbZs_y6xnYUttD2pFOmBB4lgBdza58u5vMF5rRLfOrCvG62UisbxnSnRt4GkVgUXi1a55WBZhyybb_dBi5iYvAh-8XdVdLESPHQeEP3bTEiWBJZEs8enKJdolSrfNhNplWAM4l7DsFI8kTihsrt8W9W8mf1alNuJCSa0iuyjxMENfJGWoE5vjKc5ytHBnhVl0E45ELKZfGJJB1c1SaWWK-Ac39kNcVGD7x4C3ajO6Eeqaaspc02FsRggriyDFX6Y',
  // ]

  const instagramPosts = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2dQ73j09PZ9UnYGtIxaANMROnZLkXDnoHIibFc26yYBseh7QK9rjix_bJjVjlqwhXkZgVPJS15b7jo0ZAyLvF6V9XBIfi6-OVKOeWBCH9lw8b8mG934nHVJYXX5lBOH-G3dTjbwRS50-AGvKaJ5o1q6YVkqEf2JrsOcCaWCx_t1Dvuxq9QnRFDZz8iPo27eV6-lRk1s94lUj3PwmezOkieYOHttJTGmRJYyCrpD7vENzWQsr1sIcZ8Sw1a3df7NF_rNfEwTfLaWQ8',
      icon: 'group',
      name:"Facebook",
      http:"https://www.facebook.com/piubellaesteticagym"
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHTp2nfnP37AJfd_fPpxVNcpjq9U8Imdt1HhiPl9EHtLsnBYZtD-SbPgTjuYMFPeZrrbO88ByUe3qwPHAC6bWZVWdM1jTFlxp5gFL_C92W6cfeHNohJKwDFzjuvdosbSur6yCkPpu2sSiLuWRCWLW_ZIUR2o3xMsoqm3Kg7kil6t1GYnt0Asvs3nHDvkgQwspfC6JoXJTH73EAGPthQw935JQ4EOg6J66zqEr-yA4zWtAC5Jgrf4EaL4SUbpgVEZOgKwcXzsAG7t1-',
      icon: 'photo_camera',
      name:"Instagram",
      http:"https://www.instagram.com/piubellaesteticapilates/"
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkAlUAgEFToMbHxJkxyt7q0N9QbKEmp6O_KVcIsmi2FX80ir2MFfTy78c5fCK61P2kr7DExVj4Xik-Fh1SY8l65vR_KNhgoisVItQ7_mlhXKEQEIlxgjfi63VSylh1qPyC3ZmJPHRZAteWeElvE2lPqAEDl7v5q3wSkW6wSo4YQRFT_2fn86dOmnQ9Sjc0MGBAXcnlbdzA0hJP_ghlIrom__AhG_YY_SGLUJRr2Rk4noFM6CGFs-o4na5JJGGV6Jrqgi8FrNjp8fsw',
      icon: 'chat',
      name:"WhatsApp",
      http:"https://wa.me/00541133775014"
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJPLlIKhBpT2JlaORkKAzf4x95OA0oK8ESkX5y7vvykuUm4fJaiwUVTcEU10j9kR-0NgD9qSitzmp_UXFsaaWc9DyhcGtU7Dy_DW_XEmFqk-HkUli8gyt6gH8bFslxxzLo_P1sSL3uuJBaIERA0_mxsC5W8OV0cIHx0It5Fl3fT7T7JT37HQKRuwW5IZsIJfDhf_tjSPHbCYah2wJiJe8p8xxtI0nLGdUYeGu9h4vLLg5wpjp2ZvrgYnVKKTWdgMSG7VlmnE2wRu3A',
      icon: 'map',
      name:"Google Maps",
      http:"https://search.google.com/local/writereview?placeid=ChIJzxLidZ2kvJURLNp7zU5f2Is"
    },
  ]

  return (
    <>
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Pw7c3oUnmskRbJ3-Nu6KeukKSYY9y4gtVm9iHqC2s13kwXBK3hFX3hiqX0aHXZ7WUgtS2BB_S8k_I4lBnfShdc65wXPpXgj3SvDZD7H3b_H0EFx6EI0FeLPG9dDmcyOOEJtvprfPj_RymTJEItV0lrGL1CKGs0ZqLw8XoR549NEQCQgSQ1-KiwaOzBayoF6VlOQuUwyKd1EQz4kH5Gj9P5cZYt5-T3WpZ62ob30t5iNrg0IHAPOa1K5gThd8F9VCi1iEG9U7UeSj"
          alt="Relajación y Bienestar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-gutter max-w-4xl">
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg mb-6">
            Nuestra Esencia
          </h1>
          <p className="font-sans text-body-lg italic opacity-90 max-w-2xl mx-auto">
            Donde la precisión del Pilates se encuentra con la serenidad de la estética avanzada.
          </p>
        </div>
      </header>

      <main>
        <section className="py-section-lg px-gutter max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 space-y-8">
              <span className="font-sans text-label-md tracking-widest text-primary uppercase block">
                El Centro
              </span>
              <h2 className="font-serif text-headline-md md:text-display-lg text-on-surface leading-tight">
                Un refugio diseñado para tu renovación integral.
              </h2>
              <div className="space-y-6 font-sans text-body-lg text-on-surface-variant leading-relaxed">
                <p>
                  En Piu Bella Estetica Pilates, creemos que el bienestar no es un destino, sino un
                  equilibrio armonioso entre el cuerpo y la mente. Nuestro espacio ha sido concebido
                  bajo los principios de la sofisticación orgánica, utilizando materiales naturales y
                  una iluminación cálida para crear un entorno de calma absoluta.
                </p>
                <p>
                  Desde nuestras salas de Pilates Reformer equipadas con la última tecnología, hasta
                  nuestras cabinas de tratamiento estético, cada detalle está pensado para nutrir tu
                  salud física y realzar tu belleza natural.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="#"
                  className="font-serif italic text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Conoce nuestras instalaciones
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden elegant-shadow relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgrLKoD2BPy8vH8uc6MngwBFYucBuWM3WkKqKAO7sqr56WCZi1J5ut1XRRM6rHEEmk2ABiOFlAgCOi0kdgM8OZBd0jStME_F8krXY6mYBPUQiElnpWYjGmPs8k10e1nJlHCgvRIieUktEBkKwTvvGKX_hvlUE6yvMv9N78omqv352IdmMdAK211TpZjEfXxO-57v3eMROfrrlAqsVhJjpel0eGZ8ZB1i2vL3FAj4iMc_r0AZrzsVzGLgaguXPI3uGuOaML-3k3Akwo"
                  alt="Interior Piu Bella"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden md:block w-48 h-48 bg-secondary-container p-6 rounded-lg elegant-shadow">
                <div className="h-full flex flex-col justify-center items-center text-center border border-white/50">
                  <span className="font-serif text-headline-md text-primary">23+</span>
                  <span className="font-sans text-label-md text-on-secondary-container">
                    Años de Excelencia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-container mx-auto px-gutter py-8">
          <div className="w-full h-px bg-secondary/20 relative flex justify-center items-center">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* <section className="py-section-lg bg-surface-container-low">
          <div className="max-w-container mx-auto px-gutter text-center">
            <span className="font-sans text-label-md tracking-widest text-primary uppercase mb-12 block">
              Marcas que Confían en Nosotros
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60">
              {partnerLogos.map((src, i) => (
                <div
                  key={i}
                  className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all relative"
                >
                  <Image
                    src={src}
                    alt="Partner Logo"
                    fill
                    sizes="150px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="py-section-lg">
          <div className="max-w-container mx-auto px-gutter">
            <div className="flex justify-between items-end mb-12">
              <div className="max-w-md">
                <h2 className="font-serif text-headline-md text-on-surface mb-2">
                  Síguenos en Redes
                </h2>
                <p className="font-sans text-body-md text-on-surface-variant">
                  Inspírate con nuestro estilo de vida y descubre consejos de bienestar diarios.
                </p>
              </div>
              <a
                href="https://www.instagram.com/piubellaesteticapilates/"
                className="hidden md:block font-sans text-label-md text-primary tracking-widest uppercase border-b border-primary pb-1 hover:opacity-70 transition-opacity" target='_blank'
              >
                @piubellaesteticapilates
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {instagramPosts.map((post, i) => (
                <a href={post.http} target='_blank'>
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                  >
                    <Image
                      src={post.src}
                      alt={`Instagram post ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '38px' }}>
                      {post.icon}
                    </span>
                    <p className='text-white text-3xl'>{post.name}</p>
                  </div>
                </div>
                  </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
