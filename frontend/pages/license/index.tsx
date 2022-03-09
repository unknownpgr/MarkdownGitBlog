import fs from 'fs'
import path from 'path'
import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import useInfinityScroll from '../../components/shared/useInfinityScroll'
import { Fragment, useEffect, useState } from 'react'
import ScrollBtn from '../../components/shared/scrollBtn'

interface LicenseProps {
  license: string;
  repository: string;
  publisher: string;
  email: string;
}

interface LicenseItem {
  [key: string]: LicenseProps
}

interface OpenSourceLicenseProps {
  [key: string]: LicenseItem
}

const OpenSourceLicense: NextPage<OpenSourceLicenseProps> = ({ licenses }) => {
  const [baseData, setBaseData] = useState<{
    key: string;
    value: LicenseProps;
  }[]>([])
  const { data } = useInfinityScroll<{
    key: string;
    value: LicenseProps;
  }>(baseData, 200)

  useEffect(() => {
    if (Object.entries(licenses).length > 0) {
      setBaseData(Object.entries(licenses).map(([key, value]) => {
        return { key: key, value: value }
      }))
    }
  }, [licenses])

  useEffect(() => {
    const topTitle = document.getElementById('top-title')
    if (topTitle) {
      topTitle.innerHTML = 'License'
    }
    return () => {
      if (topTitle) {
        topTitle.innerHTML = ''
      }
    }
  }, [licenses])

  if (Object.keys(licenses).length === 0) {
    return null
  }

  return (
    <Box padding='120px 0em 4em 0em' width='100%'>
      <Flex flexDirection='column' maxWidth='800px' margin='auto' padding={['0px 1.5em 4em 1.5em', '0px 2.5em 4em 2.5em', '0px 4em 4em 4em']}>
        {data && data.length > 0 && data.map((license, idx) => {
          return (
            <Fragment key={idx}>
              <Box margin='0 0 0 0'>
                <Text><strong>📔 License: </strong>{license.key}</Text>
                <Text color='gray.600'>
                  <strong style={{ color: 'black' }}>📁 GitHub Repository: </strong>
                  <a href={license.value.repository} target='_blank' rel='noreferrer'>
                    {license.value.repository}
                  </a>
                </Text>
                <Text><strong>👤 Publisher: </strong>{license.value.publisher}</Text>
                <Text color='gray.600'>
                  <strong style={{ color: 'black' }}>📧 Email: </strong>
                  <a href={`mailto:${license.value.email}`}>
                    {license.value.email}
                  </a>
                </Text>
              </Box>
              <Divider height='2px' padding='0' margin='1em 0 1em 0'></Divider>
            </Fragment>
          )
        })}
      </Flex>
      <ScrollBtn></ScrollBtn>
    </Box>
  )
}

export async function getStaticProps () {
  const buffer = fs.readFileSync(path.join('./license.json'))
  const fileContent = JSON.parse(buffer.toString())
  return {
    props: {
      licenses: fileContent
    }
  }
}

export default OpenSourceLicense
