import os
import shutil
import sys

restaurant = raw_input('Type a restaurant name:\n')

parentDir = os.path.dirname(os.getcwd())

pl = open(parentDir + '/shared/data/menus/' + restaurant + '-pl.yml', "r")
en = open(parentDir + '/shared/data/menus/' + restaurant + '-en.yml', "r")

plLines = pl.readlines()
enLines = en.readlines()

correctYaml = open(parentDir + '/shared/data/menus/' + restaurant + '.yml', "w")

for i in range(len(plLines)):
    if plLines[i].find('- name:') == 0:
        correctYaml.write('- name:\n  - ')
        correctYaml.write(plLines[i][8:])
        correctYaml.write('  - ')
        correctYaml.write(enLines[i][8:])
    elif plLines[i].find('dishes:') != -1:
        correctYaml.write('  dishes:\n')
    elif plLines[i].find('- name:') == 4:
        correctYaml.write('    - name:\n      - ')
        correctYaml.write(plLines[i][12:])
        correctYaml.write('      - ')
        correctYaml.write(enLines[i][12:])
    elif plLines[i].find('variants:') == 6:
        correctYaml.write('      variants:\n')
    elif plLines[i].find('price:') != -1:
        correctYaml.write(plLines[i])
    elif plLines[i].find('- name:') == 8:
        correctYaml.write('        - name:\n          - ')
        correctYaml.write(plLines[i][16:])
        correctYaml.write('          - ')
        correctYaml.write(enLines[i][16:])
    elif plLines[i].find('description:') == 2:
        correctYaml.write('  description:\n    - ')
        correctYaml.write(plLines[i][15:])
        correctYaml.write('    - ')
        correctYaml.write(enLines[i][15:])
    elif plLines[i].find('description:') == 6:
        correctYaml.write('      description:\n        - ')
        correctYaml.write(plLines[i][19:])
        correctYaml.write('        - ')
        correctYaml.write(enLines[i][19:])
    else:
        correctYaml.write(plLines[i])
        correctYaml.write(enLines[i])
correctYaml.close()
