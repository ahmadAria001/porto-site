<template>
  <div class="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden relative">
    <!-- Matrix Rain Background -->
    <div class="fixed inset-0 z-0 opacity-20">
      <canvas ref="matrixCanvas" class="w-full h-full"></canvas>
    </div>

    <!-- Scanlines Effect -->
    <div class="fixed inset-0 z-10 pointer-events-none">
      <div class="scanlines"></div>
    </div>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-green-400/30 shadow-neon">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-green-400 glitch-text" data-text="TereZa@terminal:~$">
              TereZa@terminal:~$
            </h1>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a v-for="item in navItems" :key="item.id" @click="scrollToSection(item.id)"
                class="terminal-link px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-green-400/10 hover:shadow-neon-sm">
                {{ item.label }}
              </a>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-green-400 hover:text-green-300 transition-colors cyber-button">
              <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
              <XIcon v-else class="w-6 h-6" />
            </button>
          </div>

          <!-- Terminal Theme Toggle -->
          <div class="hidden md:block">
            <button @click="toggleTerminalMode"
              class="cyber-button p-2 rounded-lg border border-green-400/30 hover:border-green-400 transition-all duration-300 hover:shadow-neon-sm">
              <TerminalIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <Transition name="slide-down">
          <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-green-400/30 mt-4">
            <div class="flex flex-col space-y-2">
              <a v-for="item in navItems" :key="item.id" @click="scrollToSection(item.id)"
                class="terminal-link px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                {{ item.label }}
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Grid Background -->
      <div class="absolute inset-0 opacity-30">
        <div class="cyber-grid"></div>
      </div>

      <!-- Floating Particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(particle, index) in particles" :key="index" :class="particle.class" :style="particle.style">
        </div>
      </div>

      <div class="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <Transition name="terminal-boot" appear>
          <div v-if="mounted" class="space-y-8 mt-24">
            <!-- Terminal Window -->
            <div class="terminal-window max-w-5xl mx-auto cyber-card-3d mt-10">
              <div class="terminal-header">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
                <div class="text-center text-green-400 text-sm font-mono">
                  TereZa@portfolio:~$ ./initialize_portfolio.sh
                </div>
                <div class="w-6"></div>
              </div>

              <div class="terminal-content p-8">
                <div class="space-y-4">
                  <div class="terminal-line">
                    <span class="text-green-500">$</span>
                    <span class="ml-2 typing-animation">whoami</span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 glitch-text text-2xl sm:text-4xl font-bold" data-text="Ahmad Aria">Ahmad
                      Aria</span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">alias: <span class="text-green-400 font-bold">TereZa</span></span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">role: <span class="text-green-400">{{ currentRole }}</span></span>
                    <span class="animate-pulse ml-1 text-green-400">█</span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">status: <span
                        class="text-green-400 animate-pulse glow-text">ONLINE</span></span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">location: <span class="text-green-400">Indonesia</span></span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">experience: <span class="text-green-400">{{ experience_years }}+
                        years</span></span>
                  </div>

                  <div class="terminal-line mt-6">
                    <span class="text-green-500">$</span>
                    <span class="ml-2 typing-animation">cat skills.txt</span>
                  </div>

                  <div class="ml-4 text-green-300 space-y-1">
                    <div v-for="(skill, index) in displayedSkills" :key="skill" class="terminal-line skill-item"
                      :style="{ animationDelay: `${index * 200}ms` }">
                      <span class="text-green-500">></span>
                      <span class="ml-2">{{ skill }}</span>
                    </div>
                  </div>

                  <div class="terminal-line mt-6">
                    <span class="text-green-500">$</span>
                    <span class="ml-2 typing-animation">uptime</span>
                  </div>

                  <div class="terminal-line">
                    <span class="text-green-500">></span>
                    <span class="ml-2 text-green-300">system uptime: <span class="text-green-400 animate-pulse">{{
                      uptime }}</span></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button @click="scrollToSection('projects')"
                class="cyber-button-primary px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-neon">
                <span class="flex items-center gap-2">
                  <FolderIcon class="w-5 h-5" />
                  ./view_projects.sh
                </span>
              </button>
              <button @click="scrollToSection('contact')"
                class="cyber-button-secondary px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-neon">
                <span class="flex items-center gap-2">
                  <MailIcon class="w-5 h-5" />
                  ./contact.sh
                </span>
              </button>
            </div>

            <!-- Social Links -->
            <div class="flex justify-center space-x-6 mt-8">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                class="social-icon cyber-card p-3 rounded-lg border border-green-400/30 hover:border-green-400 transition-all duration-300 hover:scale-110 hover:shadow-neon">
                <component :is="social.icon" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition name="fade-up" appear>
          <div v-if="aboutVisible" class="text-center mb-16">
            <h2 class="section-title text-3xl sm:text-4xl font-bold mb-4">
              <span class="glitch-text glow-text" data-text="./about.sh">./about.sh</span>
            </h2>
            <div class="terminal-line text-green-300">
              <span class="text-green-500">$</span>
              <span class="ml-2 typing-animation">cat /home/tereza/bio.txt</span>
            </div>
          </div>
        </Transition>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <Transition name="slide-right" appear>
            <div v-if="aboutVisible" class="space-y-6">
              <div class="terminal-window cyber-card-3d">
                <div class="terminal-header">
                  <div class="text-center text-green-400 text-sm">bio.txt</div>
                </div>
                <div class="terminal-content p-6 space-y-4 text-green-300">
                  <p class="leading-relaxed">
                    <span class="text-green-500">></span> Passionate full-stack developer from Indonesia with 2+ years
                    of experience
                    in crafting modern web applications. Specialized in Laravel, Vue.js, and
                    enterprise-level solutions.
                  </p>
                  <p class="leading-relaxed">
                    <span class="text-green-500">></span> Expert in building scalable ERP systems, healthcare management
                    platforms,
                    and government solutions. Committed to clean code, robust architecture,
                    and exceptional user experiences.
                  </p>
                  <p class="leading-relaxed">
                    <span class="text-green-500">></span> When not coding, I explore new technologies, contribute to
                    open-source
                    projects, and share knowledge with the developer community.
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mt-6">
                <span v-for="(tech, index) in technologies" :key="tech"
                  class="tech-tag px-3 py-1 rounded-full text-sm font-medium border border-green-400/30 hover:border-green-400 transition-all duration-300 hover:shadow-neon-sm cyber-card"
                  :style="{ animationDelay: `${index * 50}ms` }">
                  {{ tech }}
                </span>
              </div>
            </div>
          </Transition>

          <Transition name="slide-left" appear>
            <div v-if="aboutVisible" class="relative">
              <div class="cyber-profile w-80 h-80 mx-auto relative cyber-card-3d">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg transform rotate-3 hover:rotate-6 transition-transform duration-300 cyber-glow">
                </div>
                <div
                  class="relative bg-black/90 border border-green-400/50 rounded-lg p-8 hover:border-green-400 transition-all duration-300 hover:shadow-neon">
                  <div class="text-center">
                    <div class="w-24 h-24 mx-auto mb-4 relative">
                      <div class="absolute inset-0 bg-green-400/20 rounded-full animate-pulse cyber-glow"></div>
                      <UserIcon class="w-24 h-24 text-green-400 relative z-10" />
                      <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <h3 class="text-xl font-bold text-green-400 mb-2 glitch-text" data-text="Ahmad Aria">Ahmad Aria</h3>
                    <p class="text-green-300 mb-4">Full Stack Developer</p>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-green-500">Experience:</span>
                        <span class="text-green-300">2+ years</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-green-500">Projects:</span>
                        <span class="text-green-300">15+ completed</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-green-500">Status:</span>
                        <span class="text-green-400 animate-pulse glow-text">Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition name="fade-up" appear>
          <div v-if="skillsVisible" class="text-center mb-16">
            <h2 class="section-title text-3xl sm:text-4xl font-bold mb-4">
              <span class="glitch-text glow-text" data-text="./skills.sh">./skills.sh</span>
            </h2>
            <div class="terminal-line text-green-300">
              <span class="text-green-500">$</span>
              <span class="ml-2 typing-animation">ls -la /skills/ --sort=proficiency</span>
            </div>
          </div>
        </Transition>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TransitionGroup name="cyber-card" appear>
            <template v-if="skillsVisible">
              <div v-for="(skill, index) in skills" :key="skill.name" class="cyber-card-3d skill-card-container"
                :style="{ transitionDelay: `${index * 150}ms` }">
                <div
                  class="skill-card bg-black/90 border border-green-400/30 rounded-lg p-6 hover:border-green-400 transition-all duration-300 hover:shadow-neon transform hover:scale-105 cyber-card">
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 bg-green-400/10 border border-green-400/30 rounded-lg flex items-center justify-center mr-4 cyber-glow">
                      <component :is="skill.icon" class="w-6 h-6 text-green-400" />
                    </div>
                    <h3 class="text-xl font-semibold text-green-400">{{ skill.name }}</h3>
                  </div>
                  <p class="text-green-300 mb-4 text-sm">{{ skill.description }}</p>

                  <!-- Progress Bar -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-green-500">Proficiency</span>
                      <span class="text-green-300">{{ skill.level }}%</span>
                    </div>
                    <div class="w-full bg-green-900/30 rounded-full h-3 border border-green-400/30 overflow-hidden">
                      <div class="cyber-progress-bar h-3 rounded-full transition-all duration-2000 ease-out"
                        :style="{ width: skillsVisible ? skill.level + '%' : '0%' }"></div>
                    </div>
                  </div>

                  <div class="mt-4 text-xs text-green-500 font-mono">
                    {{ skill.category }}
                  </div>
                </div>
              </div>
            </template>
          </TransitionGroup>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition name="fade-up" appear>
          <div v-if="experienceVisible" class="text-center mb-16">
            <h2 class="section-title text-3xl sm:text-4xl font-bold mb-4">
              <span class="glitch-text glow-text" data-text="./experience.sh">./experience.sh</span>
            </h2>
            <div class="terminal-line text-green-300">
              <span class="text-green-500">$</span>
              <span class="ml-2 typing-animation">cat /var/log/career.log</span>
            </div>
          </div>
        </Transition>

        <div class="max-w-4xl mx-auto">
          <TransitionGroup name="timeline-item" appear>
            <template v-if="experienceVisible">
              <div v-for="(exp, index) in experiences" :key="exp.id" class="relative pl-8 pb-12 last:pb-0 timeline-item"
                :style="{ transitionDelay: `${index * 200}ms` }">
                <!-- Timeline line -->
                <div class="absolute left-0 top-0 bottom-0 w-px bg-green-400/30 cyber-glow"
                  v-if="index < experiences.length - 1"></div>
                <!-- Timeline dot -->
                <div
                  class="absolute left-0 top-2 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 border-2 border-black animate-pulse cyber-glow">
                </div>

                <div class="terminal-window cyber-card-3d">
                  <div class="terminal-header">
                    <div class="text-center text-green-400 text-sm">{{ exp.period }}</div>
                  </div>
                  <div class="terminal-content p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 class="text-xl font-semibold text-green-400">{{ exp.position }}</h3>
                        <p class="text-green-300 font-medium">{{ exp.company }}</p>
                      </div>
                    </div>
                    <p class="text-green-300 mb-4 leading-relaxed">{{ exp.description }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tech in exp.technologies" :key="tech"
                        class="tech-tag-small px-2 py-1 rounded text-xs font-medium border border-green-400/30 text-green-400 hover:border-green-400 transition-colors">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </TransitionGroup>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition name="fade-up" appear>
          <div v-if="projectsVisible" class="text-center mb-16">
            <h2 class="section-title text-3xl sm:text-4xl font-bold mb-4">
              <span class="glitch-text glow-text" data-text="./projects.sh">./projects.sh</span>
            </h2>
            <div class="terminal-line text-green-300">
              <span class="text-green-500">$</span>
              <span class="ml-2 typing-animation">find /projects -type f -name "*.featured" -exec ls -la {} \;</span>
            </div>
          </div>
        </Transition>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TransitionGroup name="project-card" appear>
            <template v-if="projectsVisible">
              <div v-for="(project, index) in projects" :key="project.id" class="project-card-3d"
                :style="{ transitionDelay: `${index * 200}ms` }">
                <div
                  class="project-card bg-black/90 border border-green-400/30 rounded-lg overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-neon transform hover:scale-105 cyber-card">
                  <!-- Project Image/Icon -->
                  <div
                    class="h-48 bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/40"></div>
                    <FolderIcon class="w-16 h-16 text-green-400 relative z-10" v-if="!project.img_path" />
                    <img :src="project.img_path" v-else class="w-full h-full object-cover" :alt="project.title" />
                    <div class="absolute top-4 right-4 z-20">
                      <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse cyber-glow"></div>
                    </div>
                    <div class="absolute inset-0 cyber-scan-effect"></div>
                  </div>

                  <!-- Project Content -->
                  <div class="p-6">
                    <div class="terminal-line mb-2">
                      <span class="text-green-500">></span>
                      <span class="ml-2 text-lg font-semibold text-green-400">{{ project.title }}</span>
                    </div>

                    <p class="text-green-300 mb-4 text-sm leading-relaxed">{{ project.description }}</p>

                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span v-for="tech in project.technologies" :key="tech"
                        class="tech-tag-small px-2 py-1 rounded text-xs font-medium border border-green-400/30 text-green-400 hover:border-green-400 transition-colors">
                        {{ tech }}
                      </span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                      <button v-if="project.url" @click="openProject(project.url)"
                        class="flex-1 cyber-button-primary text-sm py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                        <ExternalLinkIcon class="w-4 h-4" />
                        Launch
                      </button>
                      <button v-if="project.github" @click="openProject(project.github)"
                        class="cyber-button-secondary text-sm py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
                        <GithubIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </TransitionGroup>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition name="fade-up" appear>
          <div v-if="contactVisible" class="text-center mb-16">
            <h2 class="section-title text-3xl sm:text-4xl font-bold mb-4">
              <span class="glitch-text glow-text" data-text="./contact.sh">./contact.sh</span>
            </h2>
            <div class="terminal-line text-green-300">
              <span class="text-green-500">$</span>
              <span class="ml-2 typing-animation">netstat -an | grep :80 | head -5</span>
            </div>
          </div>
        </Transition>

        <Transition name="terminal-boot" appear>
          <div v-if="contactVisible" class="terminal-window cyber-card-3d">
            <div class="terminal-header">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
              <div class="text-center text-green-400 text-sm">
                contact_interface.sh
              </div>
              <div class="w-6"></div>
            </div>

            <div class="terminal-content p-8">
              <div class="grid md:grid-cols-2 gap-8">
                <!-- Contact Info -->
                <div class="space-y-6">
                  <div class="terminal-line">
                    <span class="text-green-500">$</span>
                    <span class="ml-2 text-green-400 typing-animation">cat contact_info.json</span>
                  </div>

                  <div class="space-y-4 ml-4">
                    <a href="mailto:ahmadaria012@gmail.com" class="contact-link flex items-center group">
                      <MailIcon class="w-5 h-5 text-green-400 mr-3" />
                      <span
                        class="text-green-300 group-hover:text-green-400 transition-colors group-hover:glow-text">ahmadaria012@gmail.com</span>
                    </a>

                    <div class="flex items-center">
                      <MapPinIcon class="w-5 h-5 text-green-400 mr-3" />
                      <span class="text-green-300">Indonesia</span>
                    </div>

                    <a href="https://github.com/ahmadAria001" target="_blank"
                      class="contact-link flex items-center group">
                      <GithubIcon class="w-5 h-5 text-green-400 mr-3" />
                      <span
                        class="text-green-300 group-hover:text-green-400 transition-colors group-hover:glow-text">github.com/ahmadAria001</span>
                    </a>

                    <a href="https://www.linkedin.com/in/ahmad-aria-a65680250/" target="_blank"
                      class="contact-link flex items-center group">
                      <LinkedinIcon class="w-5 h-5 text-green-400 mr-3" />
                      <span
                        class="text-green-300 group-hover:text-green-400 transition-colors group-hover:glow-text">LinkedIn
                        Profile</span>
                    </a>

                    <div class="terminal-line mt-6">
                      <span class="text-green-500">></span>
                      <span class="ml-2 text-green-400">Status: <span
                          class="animate-pulse glow-text">ONLINE</span></span>
                    </div>

                    <div class="terminal-line">
                      <span class="text-green-500">></span>
                      <span class="ml-2 text-green-400">Response Time: <span class="text-green-300">&lt;
                          24h</span></span>
                    </div>

                    <div class="terminal-line">
                      <span class="text-green-500">></span>
                      <span class="ml-2 text-green-400">Encryption: <span class="text-green-300">TLS 1.3</span></span>
                    </div>
                  </div>
                </div>

                <!-- Contact Form -->
                <form @submit.prevent="submitForm" class="space-y-4">
                  <div class="terminal-line mb-4">
                    <span class="text-green-500">$</span>
                    <span class="ml-2 text-green-400 typing-animation">./send_message.sh --interactive</span>
                  </div>

                  <div>
                    <label class="block text-green-500 text-sm mb-2 font-mono">--name</label>
                    <input v-model="form.name" type="text" required
                      class="cyber-input w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 text-green-300 font-mono"
                      placeholder="Enter your name">
                  </div>

                  <div>
                    <label class="block text-green-500 text-sm mb-2 font-mono">--email</label>
                    <input v-model="form.email" type="email" required
                      class="cyber-input w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 text-green-300 font-mono"
                      placeholder="Enter your email">
                  </div>

                  <div>
                    <label class="block text-green-500 text-sm mb-2 font-mono">--message</label>
                    <textarea v-model="form.message" rows="4" required
                      class="cyber-input w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 resize-none text-green-300 font-mono"
                      placeholder="Enter your message"></textarea>
                  </div>

                  <button type="submit" :disabled="isSubmitting"
                    class="cyber-button-primary w-full py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isSubmitting ? 'Transmitting...' : 'Execute ./send.sh' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-green-400/30 py-8 relative bg-black/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-2">
          <div class="terminal-line">
            <span class="text-green-500">$</span>
            <span class="ml-2 text-green-300">echo "© 2024 Ahmad Aria (TereZa). All rights reserved."</span>
          </div>
          <div class="terminal-line">
            <span class="text-green-500">></span>
            <span class="ml-2 text-green-400">Built with Vue 3 & Tailwind CSS</span>
          </div>
          <div class="terminal-line">
            <span class="text-green-500">></span>
            <span class="ml-2 text-green-400">System uptime: <span class="animate-pulse glow-text">{{ uptime
            }}</span></span>
          </div>
          <div class="terminal-line">
            <span class="text-green-500">></span>
            <span class="ml-2 text-green-400">Last updated: <span class="text-green-300">{{ new
              Date().toLocaleDateString()
                }}</span></span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, } from 'vue'
import {
  MenuIcon,
  XIcon,
  TerminalIcon,
  UserIcon,
  CodeIcon,
  DatabaseIcon,
  SmartphoneIcon,
  FolderIcon,
  MailIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  ExternalLinkIcon
} from 'lucide-vue-next'
import { ulid } from 'ulid'

// Mobile menu
const mobileMenuOpen = ref(false)

// Animation states
const mounted = ref(false)
const aboutVisible = ref(false)
const skillsVisible = ref(false)
const experienceVisible = ref(false)
const projectsVisible = ref(false)
const contactVisible = ref(false)

// Matrix canvas
const matrixCanvas = ref<HTMLCanvasElement>()

// Navigation
const navItems = [
  { id: 'home', label: './home' },
  { id: 'about', label: './about' },
  { id: 'skills', label: './skills' },
  { id: 'experience', label: './experience' },
  { id: 'projects', label: './projects' },
  { id: 'contact', label: './contact' }
]

// Social links
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ahmadAria001', icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmad-aria-a65680250/', icon: LinkedinIcon },
  { name: 'Email', url: 'mailto:ahmadaria012@gmail.com', icon: MailIcon }
]

// Typewriter effect
const roles = [
  'Full Stack Developer',
  'Laravel Enthusiast',
  'Vue.js Developer',
  'Backend Developer',
  // 'System Architect',
  'Code Craftsman',
  'Problem Solver'
]
const currentRole = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false

const typeWriter = () => {
  const currentText = roles[roleIndex]

  if (isDeleting) {
    currentRole.value = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentRole.value = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 2000)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
  }

  setTimeout(typeWriter, isDeleting ? 50 : 100)
}

// Skills display
const allSkills = ['Laravel', 'PHP', 'Vue.js', 'React', 'Node.js', 'MySQL', 'PostgreSQL', 'Docker', 'Git', 'Linux']
const displayedSkills = ref<string[]>([])
const experience_years = ref(2)

const animateSkills = () => {
  displayedSkills.value = []
  allSkills.forEach((skill, index) => {
    setTimeout(() => {
      displayedSkills.value.push(skill)
    }, index * 300)
  })
}

// Floating particles
const particles = ref<{
  class: string,
  style: {
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  };
}[]>([])

const createParticles = () => {
  particles.value = Array.from({ length: 50 }, () => ({
    class: 'absolute w-1 h-1 bg-green-400 rounded-full animate-pulse cyber-particle',
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }
  }))
}

// Matrix background
const initMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`'
  const charArray = chars.split('')
  const fontSize = 14
  const columns = canvas.width / fontSize

  const drops: number[] = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#00ff41'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(draw, 35)
}

// Data
const technologies = [
  'Laravel', 'PHP', 'Vue.js', 'React', 'Node.js', 'TypeScript', 'JavaScript',
  'MySQL', 'PostgreSQL', 'MariaDB', 'Tailwind CSS', 'Bootstrap', 'Svelte',
  'Python', 'Java', 'C#', 'Git', 'Docker', 'Linux', 'AWS'
]

const skills = [
  {
    name: 'Backend Development',
    description: 'Expert in Laravel, PHP, and building scalable server-side applications',
    level: 90,
    icon: DatabaseIcon,
    category: 'Backend'
  },
  {
    name: 'Frontend Development',
    description: 'Proficient in Vue.js, React, and modern JavaScript frameworks',
    level: 85,
    icon: CodeIcon,
    category: 'Frontend'
  },
  {
    name: 'Mobile Development',
    description: 'Experience in cross-platform mobile app development',
    level: 65,
    icon: SmartphoneIcon,
    category: 'Mobile'
  }
]

const experiences = [
  {
    id: ulid(),
    position: 'Full Stack Developer',
    company: 'Freelance',
    period: '2022 - Present',
    description: 'Developing enterprise-level web applications, ERP systems, and healthcare management platforms using Laravel, Vue.js, and modern web technologies.',
    technologies: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Tailwind CSS']
  },
  {
    id: ulid(),
    position: 'Web Developer',
    company: 'Various Projects',
    period: '2021 - 2022',
    description: 'Built responsive websites and web applications for small to medium businesses, focusing on user experience and performance optimization.',
    technologies: ['PHP', 'JavaScript', 'HTML/CSS', 'MySQL']
  }
]

const projects = [
  {
    id: ulid(),
    title: 'RSUD Prambanan Training System',
    description: 'Comprehensive training management system for RSUD Prambanan hospital, featuring course management, participant tracking, and certification generation.',
    technologies: ['Laravel', 'React', 'PHP', 'Tailwind CSS', 'MariaDB'],
    url: 'https://pelatihan.rsudprambanan.com',
    img_path: '/rsud.png'
  },
  {
    id: ulid(),
    title: 'Enterprise ERP System',
    description: 'Full-featured Enterprise Resource Planning system with modules for inventory, finance, HR, and reporting with role-based access control.',
    technologies: ['Laravel', 'React', 'PHP', 'Tailwind CSS', 'MariaDB'],
    img_path: '/erp.jpg'
  },
  {
    id: ulid(),
    title: 'Kawan Desa',
    description: 'Digital village management platform for Indonesian districts, enabling online administrative processes and community engagement.',
    technologies: ['Laravel', 'Svelte', 'PHP', 'Tailwind CSS', 'MariaDB'],
    url: 'https://github.com/ahmadAria001/KawanDesa',
    github: 'https://github.com/ahmadAria001/KawanDesa'
  }
]

// Contact form
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const sendEmail = () => {
  const subject = encodeURIComponent(`Message from ${form.value.name}`)
  const body = encodeURIComponent(`
Name: ${form.value.name}
Email: ${form.value.email}

Message:
${form.value.message}`.trim())

  const mailtoLink = `mailto:ahmadaria012@gmail.com?subject=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
}


const submitForm = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  sendEmail()
  form.value = { name: '', email: '', message: '' }
  isSubmitting.value = false

}

// Uptime counter
const uptime = ref('00:00:00')
const startTime = Date.now()

const updateUptime = () => {
  const elapsed = Date.now() - startTime
  const hours = Math.floor(elapsed / 3600000)
  const minutes = Math.floor((elapsed % 3600000) / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)

  uptime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Utility functions
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const openProject = (url: string) => {
  window.open(url, '_blank')
}

const toggleTerminalMode = () => {
  console.log('Terminal mode toggled')
}

// Intersection Observer
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        switch (id) {
          case 'about':
            aboutVisible.value = true
            break
          case 'skills':
            skillsVisible.value = true
            break
          case 'experience':
            experienceVisible.value = true
            break
          case 'projects':
            projectsVisible.value = true
            break
          case 'contact':
            contactVisible.value = true
            break
        }
      }
    })
  }, { threshold: 0.1 })

  const sections = ['about', 'skills', 'experience', 'projects', 'contact']
  sections.forEach(id => {
    const element = document.getElementById(id)
    if (element) observer.observe(element)
  })
}

onMounted(() => {
  mounted.value = true
  createParticles()
  initMatrix()
  typeWriter()
  animateSkills()
  setTimeout(observeElements, 100)

  // Start uptime counter
  setInterval(updateUptime, 1000)
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
/* Cyberpunk/Terminal Aesthetic */
.glitch-text {
  position: relative;
  color: #00ff41;
  font-weight: bold;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-1 0.5s infinite;
  color: #ff0040;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.5s infinite;
  color: #00ffff;
  z-index: -2;
}

@keyframes glitch-1 {

  0%,
  14%,
  15%,
  49%,
  50%,
  99%,
  100% {
    transform: translate(0);
  }

  15%,
  49% {
    transform: translate(-2px, 1px);
  }
}

@keyframes glitch-2 {

  0%,
  20%,
  21%,
  62%,
  63%,
  99%,
  100% {
    transform: translate(0);
  }

  21%,
  62% {
    transform: translate(2px, -1px);
  }
}

/* Glow Effects */
.glow-text {
  text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41;
}

.cyber-glow {
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}

.shadow-neon {
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3);
}

.shadow-neon-sm {
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}

/* Terminal Window */
.terminal-window {
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #00ff41;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
  backdrop-filter: blur(10px);
}

.terminal-header {
  background: rgba(0, 255, 65, 0.1);
  padding: 12px;
  border-bottom: 1px solid #00ff41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terminal-content {
  font-family: 'Courier New', monospace;
}

.terminal-line {
  margin: 8px 0;
  font-family: 'Courier New', monospace;
}

/* Scanlines Effect */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent 50%,
      rgba(0, 255, 65, 0.03) 50%);
  background-size: 100% 4px;
  animation: scanlines 0.1s linear infinite;
}

@keyframes scanlines {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(4px);
  }
}

/* Cyber Grid */
.cyber-grid {
  background-image:
    linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  width: 100%;
  height: 100%;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(50px, 50px);
  }
}

/* Buttons */
.cyber-button-primary {
  background: linear-gradient(45deg, #00ff41, #00cc33);
  color: #000;
  border: none;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
  font-family: 'Courier New', monospace;
}

.cyber-button-primary:hover {
  box-shadow: 0 0 25px rgba(0, 255, 65, 0.8);
  transform: translateY(-2px);
}

.cyber-button-secondary {
  background: transparent;
  color: #00ff41;
  border: 1px solid #00ff41;
  font-family: 'Courier New', monospace;
}

.cyber-button-secondary:hover {
  background: rgba(0, 255, 65, 0.1);
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
}

.cyber-button {
  background: transparent;
  color: #00ff41;
  border: 1px solid #00ff41;
  font-family: 'Courier New', monospace;
}

.cyber-button:hover {
  background: rgba(0, 255, 65, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}

/* Links */
.terminal-link {
  color: #00ff41;
  text-decoration: none;
  font-family: 'Courier New', monospace;
}

.terminal-link:hover {
  color: #00cc33;
  text-shadow: 0 0 5px #00ff41;
}

.contact-link:hover {
  text-shadow: 0 0 5px #00ff41;
}

/* Cards */
.cyber-card-3d {
  perspective: 1000px;
}

.cyber-card {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.cyber-card-3d:hover .cyber-card {
  transform: rotateY(5deg) rotateX(5deg);
}

.skill-card,
.project-card {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.skill-card-container:hover .skill-card,
.project-card-3d:hover .project-card {
  transform: rotateY(5deg) rotateX(5deg);
}

/* Tech Tags */
.tech-tag {
  background: rgba(0, 255, 65, 0.1);
  color: #00ff41;
  border: 1px solid rgba(0, 255, 65, 0.3);
  font-family: 'Courier New', monospace;
}

.tech-tag:hover {
  background: rgba(0, 255, 65, 0.2);
  border-color: #00ff41;
  box-shadow: 0 0 5px rgba(0, 255, 65, 0.3);
}

.tech-tag-small {
  background: rgba(0, 255, 65, 0.1);
  color: #00ff41;
  border: 1px solid rgba(0, 255, 65, 0.3);
  font-family: 'Courier New', monospace;
}

/* Social Icons */
.social-icon {
  background: rgba(0, 255, 65, 0.1);
  color: #00ff41;
  border: 1px solid rgba(0, 255, 65, 0.3);
}

.social-icon:hover {
  background: rgba(0, 255, 65, 0.2);
  border-color: #00ff41;
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
}

/* Input Fields */
.cyber-input {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 65, 0.3);
  color: #00ff41;
  font-family: 'Courier New', monospace;
}

.cyber-input:focus {
  border-color: #00ff41;
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
  background: rgba(0, 0, 0, 0.9);
}

.cyber-input::placeholder {
  color: rgba(0, 255, 65, 0.5);
}

/* Progress Bar */
.cyber-progress-bar {
  background: linear-gradient(90deg, #00ff41, #00cc33, #00ff41);
  background-size: 200% 100%;
  animation: progress-glow 2s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

@keyframes progress-glow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Particles */
.cyber-particle {
  filter: blur(0.5px);
}

/* Scan Effect */
.cyber-scan-effect {
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(0, 255, 65, 0.1) 50%,
      transparent 100%);
  animation: scan 3s ease-in-out infinite;
}

@keyframes scan {

  0%,
  100% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(100%);
  }
}

/* Typing Animation */
.typing-animation {
  overflow: hidden;
  border-right: 2px solid #00ff41;
  white-space: nowrap;
  animation: typing 2s steps(20, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: #00ff41;
  }
}

/* Skill Items */
.skill-item {
  opacity: 0;
  animation: skill-appear 0.5s ease-out forwards;
}

@keyframes skill-appear {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Section Titles */
.section-title {
  text-shadow: 0 0 20px #00ff41;
}

/* Transitions */
.terminal-boot-enter-active {
  transition: all 1s ease-out;
}

.terminal-boot-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.fade-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-right-enter-active {
  transition: all 0.8s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-enter-active {
  transition: all 0.8s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.cyber-card-enter-active {
  transition: all 0.6s ease-out;
}

.cyber-card-enter-from {
  opacity: 0;
  transform: translateY(20px) rotateX(20deg);
}

.project-card-enter-active {
  transition: all 0.8s ease-out;
}

.project-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.timeline-item-enter-active {
  transition: all 0.6s ease-out;
}

.timeline-item-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

/* Responsive */
@media (max-width: 768px) {
  .terminal-window {
    margin: 0 10px;
  }

  .glitch-text {
    font-size: 0.9em;
  }

  .cyber-grid {
    background-size: 30px 30px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {

  .glitch-text::before,
  .glitch-text::after,
  .scanlines,
  .cyber-grid,
  .cyber-progress-bar,
  .cyber-scan-effect,
  .typing-animation,
  .skill-item {
    animation: none;
  }
}
</style>
