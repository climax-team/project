export const Index = () => {
    return (
        <>
            <div id="zero-state" className='w-full h-full flex justify-center items-center flex-col text-white text-xl min-w-max'>
                <span className='text-5xl mb-2'>TODO</span>
                {/*todo change a tag link to project repository*/}
                <div>
                    Check out{" "}
                    <a className='
                        underline
                        decoration-wavy
                        hover:bg-accent_color
                        rounded-md
                        visited:decoration-accent_color
                        '
                       href="https://github.com/kwonsigyeong"
                       target='_blank'

                    >
                        the github at Kwon
                    </a>
                    .
                </div>

            </div>
        </>
    )
}