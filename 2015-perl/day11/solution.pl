use strict;
use warnings;
use Data::Dumper;

# my @aLines = ();
# open(my $fh, '<', 'input.txt');
# while(defined(my $sLine = <$fh>)) {
#   chomp($sLine);
#   push(@aLines, $sLine);
# }
# close($fh);

my $sInput = 'hepxcrrq';

sub one {

  my $sPass = increment($sInput);

  while($sPass =~ /[iol]/ || $sPass !~ /((\w)\2)(?!\1).*(\w)\3/ || !checkSequence($sPass)) {
    $sPass = increment($sPass);
  }

  return $sPass;
}

sub two {
  $sInput = shift @_;
  return one();
}

sub increment {
  my $sPass = shift @_;

  my $sIndex = -1;
  my $sChar = substr($sPass, $sIndex, 1);
  my $sSuffix = '';
  while($sChar eq 'z') {
    $sChar = substr($sPass, --$sIndex, 1);
    $sSuffix = 'a' . $sSuffix;
  }

  my $sPrefix = substr($sPass, 0, length($sPass)+$sIndex);
  $sChar++;

  return $sPrefix . $sChar . $sSuffix;
}

sub checkSequence {
  my $sPass = shift @_;

  for(my $i = 0; $i < length($sPass)-2; $i++) {
    my $sChar = substr($sPass, $i, 1);
    my $sNextChar = substr($sPass, $i+1, 1);
    my $sNextNextChar = substr($sPass, $i+2, 1);

    if ($sNextChar eq ++$sChar && $sNextNextChar eq ++$sChar) {
      return 1;
    }
  }

  return 0;
}

my $sPass = one();

print "Solution one is: " . $sPass . "\n";
print "Solution two is: " . two($sPass) . "\n";
