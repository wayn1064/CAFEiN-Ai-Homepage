import sys, re
with open('corrupted-compose.yml', 'r') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []
skip = False
for line in lines:
    if line.startswith('  cafein-ai-homepage:'):
        skip = True
        continue
    if skip:
        if line.startswith('  #') or (line.startswith('  ') and not line.startswith('    ') and line.strip() != ''):
            skip = False
        else:
            continue
    if not skip:
        new_lines.append(line)
        
content = '\n'.join(new_lines)

service_block = '''  cafein-ai-homepage:
    container_name: cafein-ai-homepage
    image: asia-northeast3-docker.pkg.dev/wayn-492112/wayn-ai-repo/cafein-ai-homepage:latest
    restart: always
    networks:
      - wayn-network
'''
content = content.replace('services:\n', 'services:\n' + service_block)
if '8013:8013' not in content:
    content = re.sub(r'(\s*nginx:.*?ports:\n)', r'\1      - "8013:8013"\n', content, flags=re.DOTALL)
with open('fixed-compose.yml', 'w') as f:
    f.write(content)
